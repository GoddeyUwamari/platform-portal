/**
 * AWS Client Factory
 * Creates AWS SDK clients with organization-specific credentials
 */

import { CostExplorerClient } from '@aws-sdk/client-cost-explorer';
import { EC2Client } from '@aws-sdk/client-ec2';
import { RDSClient } from '@aws-sdk/client-rds';
import { S3Client } from '@aws-sdk/client-s3';
import { CloudWatchClient } from '@aws-sdk/client-cloudwatch';
import { organizationService } from './organization.service';

interface AWSClients {
  costExplorer: CostExplorerClient;
  ec2: EC2Client;
  rds: RDSClient;
  s3: S3Client;
  cloudWatch: CloudWatchClient;
  region: string;
  enabled: boolean;
}

export class AWSClientFactory {
  /**
   * Create AWS clients for an organization
   * @param organizationId - Organization ID
   * @returns AWS SDK clients configured with organization credentials
   */
  static async createClients(organizationId: string): Promise<AWSClients> {
    try {
      // Get organization's AWS credentials
      const credentials = await organizationService.getAWSCredentials(organizationId);

      if (!credentials || !credentials.accessKeyId || !credentials.secretAccessKey) {
        console.log(
          `No AWS credentials configured for organization ${organizationId}, using mock clients`
        );
        return this.createMockClients();
      }

      const config = {
        region: credentials.region || 'us-east-1',
        credentials: {
          accessKeyId: credentials.accessKeyId,
          secretAccessKey: credentials.secretAccessKey,
        },
      };

      return {
        costExplorer: new CostExplorerClient(config),
        ec2: new EC2Client(config),
        rds: new RDSClient(config),
        s3: new S3Client(config),
        cloudWatch: new CloudWatchClient(config),
        region: config.region,
        enabled: true,
      };
    } catch (error) {
      console.error(
        `Error creating AWS clients for organization ${organizationId}:`,
        error
      );
      return this.createMockClients();
    }
  }

  /**
   * Create AWS clients using global environment variables (fallback for backwards compatibility)
   * @deprecated Use createClients() with organization ID instead
   */
  static createClientsFromEnv(): AWSClients {
    const hasCredentials = !!(
      process.env.AWS_ACCESS_KEY_ID &&
      process.env.AWS_SECRET_ACCESS_KEY &&
      process.env.AWS_REGION
    );

    if (!hasCredentials) {
      console.log('No global AWS credentials configured, using mock clients');
      return this.createMockClients();
    }

    const config = {
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    };

    return {
      costExplorer: new CostExplorerClient(config),
      ec2: new EC2Client(config),
      rds: new RDSClient(config),
      s3: new S3Client(config),
      cloudWatch: new CloudWatchClient(config),
      region: config.region,
      enabled: true,
    };
  }

  /**
   * Create mock AWS clients (for development/testing without AWS credentials)
   */
  private static createMockClients(): AWSClients {
    return {
      costExplorer: {} as CostExplorerClient,
      ec2: {} as EC2Client,
      rds: {} as RDSClient,
      s3: {} as S3Client,
      cloudWatch: {} as CloudWatchClient,
      region: 'us-east-1',
      enabled: false,
    };
  }

  /**
   * Validate AWS credentials for an organization
   * @param organizationId - Organization ID
   * @returns true if credentials are valid, false otherwise
   */
  static async validateCredentials(organizationId: string): Promise<boolean> {
    try {
      const clients = await this.createClients(organizationId);

      if (!clients.enabled) {
        return false;
      }

      // Try a simple API call to validate credentials
      const { S3Client, ListBucketsCommand } = await import('@aws-sdk/client-s3');
      await clients.s3.send(new ListBucketsCommand({}));

      return true;
    } catch (error: any) {
      console.error(
        `AWS credential validation failed for organization ${organizationId}:`,
        error.message
      );
      return false;
    }
  }
}
