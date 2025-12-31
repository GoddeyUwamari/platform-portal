import { Pool } from 'pg';
import { EC2Client, CreateTagsCommand } from '@aws-sdk/client-ec2';
import { RDSClient, AddTagsToResourceCommand as AddRDSTagsCommand } from '@aws-sdk/client-rds';
import { S3Client, PutBucketTaggingCommand, GetBucketTaggingCommand } from '@aws-sdk/client-s3';
import { LambdaClient, TagResourceCommand as TagLambdaCommand } from '@aws-sdk/client-lambda';
import {
  ECSClient,
  TagResourceCommand as TagECSCommand,
} from '@aws-sdk/client-ecs';
import {
  ElasticLoadBalancingV2Client,
  AddTagsCommand as AddELBTagsCommand,
} from '@aws-sdk/client-elastic-load-balancing-v2';
import { AWSResource } from '../types/aws-resources.types';

/**
 * AWS Tagging Service
 * Handles bulk tagging of AWS resources across different service types
 */
export class AWSTaggingService {
  constructor(private pool: Pool) {}

  /**
   * Bulk tag multiple resources
   */
  async bulkTagResources(
    resources: AWSResource[],
    tags: Record<string, string>
  ): Promise<{ success: number; failed: number; errors: string[] }> {
    let success = 0;
    let failed = 0;
    const errors: string[] = [];

    // Group resources by type and region
    const resourcesByTypeAndRegion = this.groupResourcesByTypeAndRegion(resources);

    for (const [key, groupedResources] of resourcesByTypeAndRegion) {
      const [type, region] = key.split('::');

      try {
        await this.tagResourcesByType(type, region, groupedResources, tags);
        success += groupedResources.length;
      } catch (error: any) {
        failed += groupedResources.length;
        errors.push(`${type} in ${region}: ${error.message}`);
      }
    }

    return { success, failed, errors };
  }

  /**
   * Group resources by type and region for efficient bulk operations
   */
  private groupResourcesByTypeAndRegion(
    resources: AWSResource[]
  ): Map<string, AWSResource[]> {
    const grouped = new Map<string, AWSResource[]>();

    for (const resource of resources) {
      const key = `${resource.resource_type}::${resource.region}`;
      if (!grouped.has(key)) {
        grouped.set(key, []);
      }
      grouped.get(key)!.push(resource);
    }

    return grouped;
  }

  /**
   * Tag resources by their type using appropriate AWS SDK
   */
  private async tagResourcesByType(
    type: string,
    region: string,
    resources: AWSResource[],
    tags: Record<string, string>
  ): Promise<void> {
    switch (type) {
      case 'ec2':
        await this.tagEC2Resources(region, resources, tags);
        break;
      case 'rds':
        await this.tagRDSResources(region, resources, tags);
        break;
      case 's3':
        await this.tagS3Resources(region, resources, tags);
        break;
      case 'lambda':
        await this.tagLambdaResources(region, resources, tags);
        break;
      case 'ecs':
        await this.tagECSResources(region, resources, tags);
        break;
      case 'load-balancer':
        await this.tagLoadBalancerResources(region, resources, tags);
        break;
      case 'vpc':
        await this.tagVPCResources(region, resources, tags);
        break;
      default:
        throw new Error(`Unsupported resource type: ${type}`);
    }

    // Update tags in database
    await this.updateTagsInDatabase(resources, tags);
  }

  /**
   * Tag EC2 instances
   */
  private async tagEC2Resources(
    region: string,
    resources: AWSResource[],
    tags: Record<string, string>
  ): Promise<void> {
    const ec2Client = new EC2Client({ region });

    const awsTags = Object.entries(tags).map(([key, value]) => ({
      Key: key,
      Value: value,
    }));

    await ec2Client.send(
      new CreateTagsCommand({
        Resources: resources.map(r => r.resource_id),
        Tags: awsTags,
      })
    );
  }

  /**
   * Tag RDS instances
   */
  private async tagRDSResources(
    region: string,
    resources: AWSResource[],
    tags: Record<string, string>
  ): Promise<void> {
    const rdsClient = new RDSClient({ region });

    const awsTags = Object.entries(tags).map(([key, value]) => ({
      Key: key,
      Value: value,
    }));

    // RDS tagging is per-resource
    for (const resource of resources) {
      await rdsClient.send(
        new AddRDSTagsCommand({
          ResourceName: resource.resource_arn,
          Tags: awsTags,
        })
      );
    }
  }

  /**
   * Tag S3 buckets
   */
  private async tagS3Resources(
    region: string,
    resources: AWSResource[],
    tags: Record<string, string>
  ): Promise<void> {
    const s3Client = new S3Client({ region });

    // S3 tagging is per-bucket
    for (const resource of resources) {
      try {
        // Get existing tags
        let existingTags: Record<string, string> = {};
        try {
          const { TagSet } = await s3Client.send(
            new GetBucketTaggingCommand({ Bucket: resource.resource_id })
          );
          existingTags = (TagSet || []).reduce((acc, tag) => {
            if (tag.Key && tag.Value) {
              acc[tag.Key] = tag.Value;
            }
            return acc;
          }, {} as Record<string, string>);
        } catch (error) {
          // No existing tags
        }

        // Merge with new tags
        const mergedTags = { ...existingTags, ...tags };

        const awsTags = Object.entries(mergedTags).map(([key, value]) => ({
          Key: key,
          Value: value,
        }));

        await s3Client.send(
          new PutBucketTaggingCommand({
            Bucket: resource.resource_id,
            Tagging: { TagSet: awsTags },
          })
        );
      } catch (error: any) {
        console.error(`Error tagging S3 bucket ${resource.resource_id}:`, error.message);
        throw error;
      }
    }
  }

  /**
   * Tag Lambda functions
   */
  private async tagLambdaResources(
    region: string,
    resources: AWSResource[],
    tags: Record<string, string>
  ): Promise<void> {
    const lambdaClient = new LambdaClient({ region });

    // Lambda tagging is per-function
    for (const resource of resources) {
      await lambdaClient.send(
        new TagLambdaCommand({
          Resource: resource.resource_arn,
          Tags: tags,
        })
      );
    }
  }

  /**
   * Tag ECS services
   */
  private async tagECSResources(
    region: string,
    resources: AWSResource[],
    tags: Record<string, string>
  ): Promise<void> {
    const ecsClient = new ECSClient({ region });

    const awsTags = Object.entries(tags).map(([key, value]) => ({
      key,
      value,
    }));

    // ECS tagging is per-resource
    for (const resource of resources) {
      await ecsClient.send(
        new TagECSCommand({
          resourceArn: resource.resource_arn,
          tags: awsTags,
        })
      );
    }
  }

  /**
   * Tag Load Balancers
   */
  private async tagLoadBalancerResources(
    region: string,
    resources: AWSResource[],
    tags: Record<string, string>
  ): Promise<void> {
    const elbClient = new ElasticLoadBalancingV2Client({ region });

    const awsTags = Object.entries(tags).map(([key, value]) => ({
      Key: key,
      Value: value,
    }));

    // Can tag multiple load balancers at once
    await elbClient.send(
      new AddELBTagsCommand({
        ResourceArns: resources.map(r => r.resource_arn),
        Tags: awsTags,
      })
    );
  }

  /**
   * Tag VPC resources
   */
  private async tagVPCResources(
    region: string,
    resources: AWSResource[],
    tags: Record<string, string>
  ): Promise<void> {
    const ec2Client = new EC2Client({ region });

    const awsTags = Object.entries(tags).map(([key, value]) => ({
      Key: key,
      Value: value,
    }));

    await ec2Client.send(
      new CreateTagsCommand({
        Resources: resources.map(r => r.resource_id),
        Tags: awsTags,
      })
    );
  }

  /**
   * Update tags in database
   */
  private async updateTagsInDatabase(
    resources: AWSResource[],
    newTags: Record<string, string>
  ): Promise<void> {
    const client = await this.pool.connect();

    try {
      for (const resource of resources) {
        // Merge existing tags with new tags
        const mergedTags = { ...resource.tags, ...newTags };

        await client.query(
          `UPDATE aws_resources
           SET tags = $1, updated_at = NOW()
           WHERE id = $2`,
          [JSON.stringify(mergedTags), resource.id]
        );
      }
    } finally {
      client.release();
    }
  }
}
