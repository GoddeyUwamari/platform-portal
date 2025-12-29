import { Pool } from 'pg';
import {
  EC2Client,
  DescribeInstancesCommand,
  Instance,
  DescribeVolumesCommand,
  DescribeAddressesCommand,
} from '@aws-sdk/client-ec2';
import {
  RDSClient,
  DescribeDBInstancesCommand,
  DBInstance,
} from '@aws-sdk/client-rds';
import {
  S3Client,
  ListBucketsCommand,
  GetBucketLocationCommand,
  GetBucketEncryptionCommand,
  GetBucketAclCommand,
} from '@aws-sdk/client-s3';
import { AWSClientFactory } from './aws-client-factory.service';
import {
  AWSResource,
  CreateAWSResourceInput,
  ResourceType,
  DiscoveryResult,
  DiscoveryJobStatus,
  EC2InstanceMetadata,
  RDSInstanceMetadata,
  S3BucketMetadata,
} from '../types/aws-resources.types';

export class AWSResourceDiscoveryService {
  constructor(private pool: Pool) {}

  /**
   * Discover all AWS resources for an organization
   * Creates a discovery job and scans EC2, RDS, and S3 resources
   */
  async discoverAllResources(organizationId: string): Promise<DiscoveryResult> {
    const client = await this.pool.connect();
    let jobId: string;

    try {
      // Create discovery job
      const jobResult = await client.query(
        `INSERT INTO resource_discovery_jobs (organization_id, status, started_at, resource_types, regions)
         VALUES ($1, $2, NOW(), $3, $4)
         RETURNING id`,
        [
          organizationId,
          'running' as DiscoveryJobStatus,
          ['ec2', 'rds', 's3'],
          [] // Will be populated during discovery
        ]
      );
      jobId = jobResult.rows[0].id;

      // Get AWS clients
      const awsClients = await AWSClientFactory.createClients(organizationId);

      if (!awsClients.enabled) {
        throw new Error('AWS credentials not configured for this organization');
      }

      const errors: string[] = [];
      let totalDiscovered = 0;
      let totalUpdated = 0;

      // Discover EC2 instances
      try {
        const ec2Resources = await this.discoverEC2Instances(organizationId, awsClients.ec2!, awsClients.region);
        for (const resource of ec2Resources) {
          const result = await this.upsertResource(client, resource);
          if (result === 'created') totalDiscovered++;
          else if (result === 'updated') totalUpdated++;
        }
        console.log(`[Discovery] Found ${ec2Resources.length} EC2 instances`);
      } catch (error: any) {
        console.error('[Discovery] EC2 discovery failed:', error.message);
        errors.push(`EC2: ${error.message}`);
      }

      // Discover RDS databases
      try {
        const rdsResources = await this.discoverRDSDatabases(organizationId, awsClients.rds!, awsClients.region);
        for (const resource of rdsResources) {
          const result = await this.upsertResource(client, resource);
          if (result === 'created') totalDiscovered++;
          else if (result === 'updated') totalUpdated++;
        }
        console.log(`[Discovery] Found ${rdsResources.length} RDS databases`);
      } catch (error: any) {
        console.error('[Discovery] RDS discovery failed:', error.message);
        errors.push(`RDS: ${error.message}`);
      }

      // Discover S3 buckets
      try {
        const s3Resources = await this.discoverS3Buckets(organizationId, awsClients.s3!, awsClients.region);
        for (const resource of s3Resources) {
          const result = await this.upsertResource(client, resource);
          if (result === 'created') totalDiscovered++;
          else if (result === 'updated') totalUpdated++;
        }
        console.log(`[Discovery] Found ${s3Resources.length} S3 buckets`);
      } catch (error: any) {
        console.error('[Discovery] S3 discovery failed:', error.message);
        errors.push(`S3: ${error.message}`);
      }

      // Update job status
      await client.query(
        `UPDATE resource_discovery_jobs
         SET status = $1, completed_at = NOW(), resources_discovered = $2, resources_updated = $3, error_message = $4
         WHERE id = $5`,
        [
          errors.length > 0 ? 'failed' : 'completed',
          totalDiscovered,
          totalUpdated,
          errors.length > 0 ? errors.join('; ') : null,
          jobId
        ]
      );

      return {
        job_id: jobId,
        resources_discovered: totalDiscovered,
        resources_updated: totalUpdated,
        resources_deleted: 0,
        errors
      };
    } catch (error: any) {
      // Update job as failed
      if (jobId!) {
        await client.query(
          `UPDATE resource_discovery_jobs
           SET status = $1, completed_at = NOW(), error_message = $2
           WHERE id = $3`,
          ['failed', error.message, jobId]
        );
      }
      throw error;
    } finally {
      client.release();
    }
  }

  /**
   * Discover EC2 instances
   */
  private async discoverEC2Instances(
    organizationId: string,
    ec2Client: EC2Client,
    region: string
  ): Promise<CreateAWSResourceInput[]> {
    const command = new DescribeInstancesCommand({});
    const response = await ec2Client.send(command);

    const resources: CreateAWSResourceInput[] = [];

    for (const reservation of response.Reservations || []) {
      for (const instance of reservation.Instances || []) {
        if (!instance.InstanceId) continue;

        const tags = this.extractTags(instance.Tags);
        const name = tags.Name || instance.InstanceId;

        const metadata: EC2InstanceMetadata = {
          instance_type: instance.InstanceType || 'unknown',
          platform: instance.Platform,
          vpc_id: instance.VpcId,
          subnet_id: instance.SubnetId,
          public_ip: instance.PublicIpAddress,
          private_ip: instance.PrivateIpAddress,
          availability_zone: instance.Placement?.AvailabilityZone,
          launch_time: instance.LaunchTime?.toISOString(),
        };

        resources.push({
          organization_id: organizationId,
          resource_arn: `arn:aws:ec2:${region}:*:instance/${instance.InstanceId}`,
          resource_id: instance.InstanceId,
          resource_name: name,
          resource_type: 'ec2',
          region,
          tags,
          metadata,
          status: this.mapEC2Status(instance.State?.Name),
          estimated_monthly_cost: this.estimateEC2Cost(instance.InstanceType || 'unknown'),
          is_encrypted: this.checkEC2Encryption(instance),
          is_public: !!instance.PublicIpAddress,
          has_backup: false, // Will be determined by compliance scanner
        });
      }
    }

    return resources;
  }

  /**
   * Discover RDS database instances
   */
  private async discoverRDSDatabases(
    organizationId: string,
    rdsClient: RDSClient,
    region: string
  ): Promise<CreateAWSResourceInput[]> {
    const command = new DescribeDBInstancesCommand({});
    const response = await rdsClient.send(command);

    const resources: CreateAWSResourceInput[] = [];

    for (const dbInstance of response.DBInstances || []) {
      if (!dbInstance.DBInstanceIdentifier) continue;

      const tags = this.extractTags(dbInstance.TagList);
      const name = tags.Name || dbInstance.DBInstanceIdentifier;

      const metadata: RDSInstanceMetadata = {
        db_instance_class: dbInstance.DBInstanceClass || 'unknown',
        engine: dbInstance.Engine || 'unknown',
        engine_version: dbInstance.EngineVersion || 'unknown',
        allocated_storage: dbInstance.AllocatedStorage,
        multi_az: dbInstance.MultiAZ,
        publicly_accessible: dbInstance.PubliclyAccessible,
        vpc_id: dbInstance.DBSubnetGroup?.VpcId,
      };

      resources.push({
        organization_id: organizationId,
        resource_arn: dbInstance.DBInstanceArn || `arn:aws:rds:${region}:*:db:${dbInstance.DBInstanceIdentifier}`,
        resource_id: dbInstance.DBInstanceIdentifier,
        resource_name: name,
        resource_type: 'rds',
        region,
        tags,
        metadata,
        status: this.mapRDSStatus(dbInstance.DBInstanceStatus),
        estimated_monthly_cost: this.estimateRDSCost(dbInstance.DBInstanceClass || 'unknown'),
        is_encrypted: dbInstance.StorageEncrypted || false,
        is_public: dbInstance.PubliclyAccessible || false,
        has_backup: (dbInstance.BackupRetentionPeriod || 0) > 0,
      });
    }

    return resources;
  }

  /**
   * Discover S3 buckets
   */
  private async discoverS3Buckets(
    organizationId: string,
    s3Client: S3Client,
    defaultRegion: string
  ): Promise<CreateAWSResourceInput[]> {
    const command = new ListBucketsCommand({});
    const response = await s3Client.send(command);

    const resources: CreateAWSResourceInput[] = [];

    for (const bucket of response.Buckets || []) {
      if (!bucket.Name) continue;

      let region = defaultRegion;
      let isEncrypted = false;
      let isPublic = false;

      try {
        // Get bucket region
        const locationCommand = new GetBucketLocationCommand({ Bucket: bucket.Name });
        const locationResponse = await s3Client.send(locationCommand);
        region = locationResponse.LocationConstraint || 'us-east-1';

        // Check encryption
        try {
          const encryptionCommand = new GetBucketEncryptionCommand({ Bucket: bucket.Name });
          await s3Client.send(encryptionCommand);
          isEncrypted = true;
        } catch (error: any) {
          // No encryption configured
          isEncrypted = false;
        }

        // Check public access
        try {
          const aclCommand = new GetBucketAclCommand({ Bucket: bucket.Name });
          const aclResponse = await s3Client.send(aclCommand);
          isPublic = (aclResponse.Grants || []).some(
            grant => grant.Grantee?.URI === 'http://acs.amazonaws.com/groups/global/AllUsers'
          );
        } catch (error: any) {
          // Error checking ACL
          isPublic = false;
        }
      } catch (error: any) {
        console.error(`[S3 Discovery] Error processing bucket ${bucket.Name}:`, error.message);
      }

      const metadata: S3BucketMetadata = {
        creation_date: bucket.CreationDate?.toISOString(),
        versioning_enabled: false, // Could query GetBucketVersioning
        logging_enabled: false,
        lifecycle_rules: 0,
      };

      resources.push({
        organization_id: organizationId,
        resource_arn: `arn:aws:s3:::${bucket.Name}`,
        resource_id: bucket.Name,
        resource_name: bucket.Name,
        resource_type: 's3',
        region,
        tags: {}, // S3 bucket tags require separate API call
        metadata,
        status: 'active',
        estimated_monthly_cost: this.estimateS3Cost(),
        is_encrypted: isEncrypted,
        is_public: isPublic,
        has_backup: false, // S3 has versioning, not traditional backups
      });
    }

    return resources;
  }

  /**
   * Upsert resource into database
   * Returns 'created' or 'updated'
   */
  private async upsertResource(
    client: any,
    resource: CreateAWSResourceInput
  ): Promise<'created' | 'updated'> {
    const result = await client.query(
      `INSERT INTO aws_resources (
        organization_id, resource_arn, resource_id, resource_name, resource_type, region,
        tags, metadata, status, estimated_monthly_cost, actual_monthly_cost,
        is_encrypted, is_public, has_backup, compliance_issues, last_synced_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, NOW())
      ON CONFLICT (organization_id, resource_arn)
      DO UPDATE SET
        resource_name = EXCLUDED.resource_name,
        tags = EXCLUDED.tags,
        metadata = EXCLUDED.metadata,
        status = EXCLUDED.status,
        estimated_monthly_cost = EXCLUDED.estimated_monthly_cost,
        is_encrypted = EXCLUDED.is_encrypted,
        is_public = EXCLUDED.is_public,
        has_backup = EXCLUDED.has_backup,
        last_synced_at = NOW(),
        updated_at = NOW()
      RETURNING (xmax = 0) AS inserted`,
      [
        resource.organization_id,
        resource.resource_arn,
        resource.resource_id,
        resource.resource_name,
        resource.resource_type,
        resource.region,
        JSON.stringify(resource.tags || {}),
        JSON.stringify(resource.metadata || {}),
        resource.status,
        resource.estimated_monthly_cost || 0,
        resource.actual_monthly_cost || 0,
        resource.is_encrypted || false,
        resource.is_public || false,
        resource.has_backup || false,
        JSON.stringify(resource.compliance_issues || []),
      ]
    );

    return result.rows[0].inserted ? 'created' : 'updated';
  }

  /**
   * Extract tags from AWS tag format
   */
  private extractTags(tags: any[] | undefined): Record<string, string> {
    if (!tags) return {};
    return tags.reduce((acc, tag) => {
      if (tag.Key && tag.Value) {
        acc[tag.Key] = tag.Value;
      }
      return acc;
    }, {} as Record<string, string>);
  }

  /**
   * Map EC2 instance state to our status
   */
  private mapEC2Status(state: string | undefined): string {
    const mapping: Record<string, string> = {
      pending: 'pending',
      running: 'running',
      'shutting-down': 'stopping',
      terminated: 'terminated',
      stopping: 'stopping',
      stopped: 'stopped',
    };
    return mapping[state || ''] || 'unknown';
  }

  /**
   * Map RDS instance status to our status
   */
  private mapRDSStatus(status: string | undefined): string {
    return status || 'unknown';
  }

  /**
   * Check if EC2 instance has encrypted volumes
   */
  private checkEC2Encryption(instance: Instance): boolean {
    // Check if EBS volumes are encrypted
    // For simplicity, assume not encrypted (real check would query volumes)
    return false;
  }

  /**
   * Estimate monthly cost for EC2 instance
   * Hardcoded estimates based on instance type
   */
  private estimateEC2Cost(instanceType: string): number {
    const costs: Record<string, number> = {
      't2.micro': 8.5,
      't2.small': 17,
      't2.medium': 34,
      't2.large': 67,
      't2.xlarge': 134,
      't3.micro': 7.5,
      't3.small': 15,
      't3.medium': 30,
      't3.large': 60,
      't3.xlarge': 120,
      'm5.large': 70,
      'm5.xlarge': 140,
      'm5.2xlarge': 280,
      'c5.large': 62,
      'c5.xlarge': 124,
      'r5.large': 91,
      'r5.xlarge': 182,
    };
    return costs[instanceType] || 50; // Default estimate
  }

  /**
   * Estimate monthly cost for RDS instance
   * Hardcoded estimates based on instance class
   */
  private estimateRDSCost(instanceClass: string): number {
    const costs: Record<string, number> = {
      'db.t3.micro': 12,
      'db.t3.small': 24,
      'db.t3.medium': 48,
      'db.t3.large': 96,
      'db.m5.large': 122,
      'db.m5.xlarge': 244,
      'db.r5.large': 175,
      'db.r5.xlarge': 350,
    };
    return costs[instanceClass] || 75; // Default estimate
  }

  /**
   * Estimate monthly cost for S3 bucket
   * Fixed estimate (actual cost depends on storage and requests)
   */
  private estimateS3Cost(): number {
    return 5; // $5/month baseline estimate
  }
}
