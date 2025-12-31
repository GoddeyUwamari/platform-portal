import {
  AWSResource,
  ComplianceIssue,
  ComplianceSeverity,
  ComplianceCategory,
} from '../types/aws-resources.types';
import {
  S3Client,
  GetBucketAclCommand,
  GetBucketPolicyCommand,
} from '@aws-sdk/client-s3';
import {
  EC2Client,
  DescribeSecurityGroupsCommand,
} from '@aws-sdk/client-ec2';
import {
  IAMClient,
  ListUsersCommand,
  ListMFADevicesCommand,
  ListAccessKeysCommand,
} from '@aws-sdk/client-iam';

/**
 * Compliance Scanner Service
 * Scans AWS resources for security and compliance issues
 */
export class ComplianceScannerService {
  /**
   * Scan a single resource for compliance issues
   */
  async scanResource(resource: AWSResource): Promise<ComplianceIssue[]> {
    const issues: ComplianceIssue[] = [];

    // Check encryption
    issues.push(...this.checkEncryption(resource));

    // Check public access
    issues.push(...this.checkPublicAccess(resource));

    // Check backups
    issues.push(...this.checkBackups(resource));

    // Check tagging
    issues.push(...this.checkTags(resource));

    return issues;
  }

  /**
   * Check encryption compliance
   */
  private checkEncryption(resource: AWSResource): ComplianceIssue[] {
    const issues: ComplianceIssue[] = [];

    if (!resource.is_encrypted) {
      let severity: ComplianceSeverity = 'medium';
      let issue = '';
      let recommendation = '';

      switch (resource.resource_type) {
        case 'rds':
          severity = 'critical';
          issue = 'RDS database is not encrypted at rest';
          recommendation = 'Enable encryption at rest for the RDS instance. Note: Requires creating a new encrypted instance and migrating data.';
          break;

        case 'ec2':
          severity = 'high';
          issue = 'EC2 instance has unencrypted EBS volumes';
          recommendation = 'Create encrypted snapshots of EBS volumes and launch new instance with encrypted volumes.';
          break;

        case 's3':
          severity = 'high';
          issue = 'S3 bucket does not have default encryption enabled';
          recommendation = 'Enable default encryption for the S3 bucket using AES-256 or AWS KMS.';
          break;

        default:
          severity = 'medium';
          issue = `${resource.resource_type.toUpperCase()} resource is not encrypted`;
          recommendation = 'Enable encryption for this resource following AWS best practices.';
      }

      issues.push({
        severity,
        category: 'encryption',
        issue,
        recommendation,
        resource_arn: resource.resource_arn,
      });
    }

    return issues;
  }

  /**
   * Check public access compliance
   */
  private checkPublicAccess(resource: AWSResource): ComplianceIssue[] {
    const issues: ComplianceIssue[] = [];

    if (resource.is_public) {
      let severity: ComplianceSeverity = 'high';
      let issue = '';
      let recommendation = '';

      switch (resource.resource_type) {
        case 's3':
          severity = 'critical';
          issue = 'S3 bucket is publicly accessible';
          recommendation = 'Remove public access permissions from bucket ACL and bucket policy. Enable S3 Block Public Access.';
          break;

        case 'rds':
          severity = 'critical';
          issue = 'RDS database is publicly accessible';
          recommendation = 'Modify the RDS instance to disable public accessibility. Access should be restricted to VPC resources only.';
          break;

        case 'ec2':
          severity = 'high';
          issue = 'EC2 instance has a public IP address';
          recommendation = 'Review security groups to ensure only necessary ports are exposed. Consider using a bastion host or VPN for access.';
          break;

        default:
          severity = 'high';
          issue = `${resource.resource_type.toUpperCase()} resource is publicly accessible`;
          recommendation = 'Restrict public access to this resource unless absolutely necessary.';
      }

      issues.push({
        severity,
        category: 'public_access',
        issue,
        recommendation,
        resource_arn: resource.resource_arn,
      });
    }

    return issues;
  }

  /**
   * Check backup compliance
   */
  private checkBackups(resource: AWSResource): ComplianceIssue[] {
    const issues: ComplianceIssue[] = [];

    // Only check backups for resources that should have them
    if (['rds', 'ec2'].includes(resource.resource_type) && !resource.has_backup) {
      let severity: ComplianceSeverity = 'high';
      let issue = '';
      let recommendation = '';

      switch (resource.resource_type) {
        case 'rds':
          severity = 'high';
          issue = 'RDS database does not have automated backups enabled';
          recommendation = 'Enable automated backups with a retention period of at least 7 days. Consider enabling automated snapshots.';
          break;

        case 'ec2':
          severity = 'medium';
          issue = 'EC2 instance does not have regular snapshots';
          recommendation = 'Create a snapshot schedule using AWS Backup or Lambda function to automate EBS snapshots.';
          break;
      }

      issues.push({
        severity,
        category: 'backups',
        issue,
        recommendation,
        resource_arn: resource.resource_arn,
      });
    }

    return issues;
  }

  /**
   * Check tagging compliance
   * Required tags: Owner, Environment, Team
   */
  private checkTags(resource: AWSResource): ComplianceIssue[] {
    const issues: ComplianceIssue[] = [];
    const requiredTags = ['Owner', 'Environment', 'Team'];
    const missingTags: string[] = [];

    for (const tag of requiredTags) {
      if (!resource.tags[tag]) {
        missingTags.push(tag);
      }
    }

    if (missingTags.length > 0) {
      issues.push({
        severity: 'low',
        category: 'tagging',
        issue: `Resource is missing required tags: ${missingTags.join(', ')}`,
        recommendation: `Add the following tags to this resource: ${missingTags.join(', ')}. Tags are important for cost allocation and resource management.`,
        resource_arn: resource.resource_arn,
      });
    }

    return issues;
  }

  /**
   * Scan multiple resources and return aggregate compliance data
   */
  async scanMultipleResources(resources: AWSResource[]): Promise<Map<string, ComplianceIssue[]>> {
    const results = new Map<string, ComplianceIssue[]>();

    for (const resource of resources) {
      const issues = await this.scanResource(resource);
      if (issues.length > 0) {
        results.set(resource.id, issues);
      }
    }

    return results;
  }

  /**
   * Get severity color for UI
   */
  static getSeverityColor(severity: ComplianceSeverity): string {
    const colors: Record<ComplianceSeverity, string> = {
      critical: 'red',
      high: 'orange',
      medium: 'yellow',
      low: 'blue',
    };
    return colors[severity];
  }

  /**
   * Get category display name
   */
  static getCategoryDisplayName(category: ComplianceCategory): string {
    const names: Record<ComplianceCategory, string> = {
      encryption: 'Encryption',
      backups: 'Backups',
      public_access: 'Public Access',
      tagging: 'Tagging',
      iam: 'IAM',
      networking: 'Networking',
    };
    return names[category];
  }

  /**
   * Enhanced S3 public access check
   * Checks both ACL and bucket policy for public access
   */
  async checkS3PublicAccessEnhanced(resource: AWSResource, region: string): Promise<ComplianceIssue[]> {
    if (resource.resource_type !== 's3') return [];

    const issues: ComplianceIssue[] = [];

    try {
      const s3Client = new S3Client({ region });

      // Check bucket ACL
      try {
        const { Grants } = await s3Client.send(
          new GetBucketAclCommand({ Bucket: resource.resource_id })
        );

        const hasPublicRead = Grants?.some(grant =>
          grant.Grantee?.URI === 'http://acs.amazonaws.com/groups/global/AllUsers' &&
          (grant.Permission === 'READ' || grant.Permission === 'FULL_CONTROL')
        );

        if (hasPublicRead) {
          issues.push({
            severity: 'critical',
            category: 'public_access',
            issue: 'S3 bucket ACL allows public read access',
            recommendation: 'Remove public read permissions from bucket ACL. Use AWS S3 Block Public Access feature.',
            resource_arn: resource.resource_arn,
          });
        }
      } catch (error: any) {
        console.error('[Compliance] Error checking S3 ACL:', error.message);
      }

      // Check bucket policy for public access
      try {
        const { Policy } = await s3Client.send(
          new GetBucketPolicyCommand({ Bucket: resource.resource_id })
        );

        if (Policy) {
          const policyDoc = JSON.parse(Policy);

          // Check for wildcard principals
          if (Policy.includes('"Principal":"*"') || Policy.includes('"Principal":{"AWS":"*"}')) {
            issues.push({
              severity: 'critical',
              category: 'public_access',
              issue: 'S3 bucket policy allows public access (wildcard principal)',
              recommendation: 'Restrict bucket policy to specific IAM principals or AWS accounts only.',
              resource_arn: resource.resource_arn,
            });
          }
        }
      } catch (error: any) {
        // NoSuchBucketPolicy error is expected for buckets without policies
        if (error.name !== 'NoSuchBucketPolicy') {
          console.error('[Compliance] Error checking S3 policy:', error.message);
        }
      }
    } catch (error: any) {
      console.error('[Compliance] Error in S3 public access check:', error.message);
    }

    return issues;
  }

  /**
   * Check for overly permissive security groups
   * Identifies security groups with 0.0.0.0/0 ingress rules
   */
  async checkSecurityGroups(region: string, accountId?: string): Promise<ComplianceIssue[]> {
    const issues: ComplianceIssue[] = [];

    try {
      const ec2Client = new EC2Client({ region });
      const { SecurityGroups } = await ec2Client.send(new DescribeSecurityGroupsCommand({}));

      for (const sg of SecurityGroups || []) {
        // Check for 0.0.0.0/0 ingress rules
        const openRules = sg.IpPermissions?.filter(rule =>
          rule.IpRanges?.some(range => range.CidrIp === '0.0.0.0/0')
        );

        if (openRules && openRules.length > 0) {
          for (const rule of openRules) {
            const fromPort = rule.FromPort || 0;
            const toPort = rule.ToPort || 65535;

            // Critical if SSH (22) or RDP (3389) is open to the world
            if (fromPort <= 22 && toPort >= 22) {
              issues.push({
                severity: 'critical',
                category: 'networking',
                issue: `Security group "${sg.GroupName}" (${sg.GroupId}) allows SSH (port 22) from anywhere (0.0.0.0/0)`,
                recommendation: 'Restrict SSH access to specific IP addresses or use AWS Systems Manager Session Manager instead.',
                resource_arn: `arn:aws:ec2:${region}:${accountId || '*'}:security-group/${sg.GroupId}`,
              });
            } else if (fromPort <= 3389 && toPort >= 3389) {
              issues.push({
                severity: 'critical',
                category: 'networking',
                issue: `Security group "${sg.GroupName}" (${sg.GroupId}) allows RDP (port 3389) from anywhere (0.0.0.0/0)`,
                recommendation: 'Restrict RDP access to specific IP addresses or use a bastion host.',
                resource_arn: `arn:aws:ec2:${region}:${accountId || '*'}:security-group/${sg.GroupId}`,
              });
            } else {
              issues.push({
                severity: 'high',
                category: 'networking',
                issue: `Security group "${sg.GroupName}" (${sg.GroupId}) allows port ${fromPort}${fromPort !== toPort ? `-${toPort}` : ''} from anywhere (0.0.0.0/0)`,
                recommendation: 'Restrict access to known IP ranges or use security group references for inter-resource communication.',
                resource_arn: `arn:aws:ec2:${region}:${accountId || '*'}:security-group/${sg.GroupId}`,
              });
            }
          }
        }
      }
    } catch (error: any) {
      console.error('[Compliance] Error checking security groups:', error.message);
    }

    return issues;
  }

  /**
   * Check IAM security best practices
   * Checks for MFA on users and access key rotation
   */
  async checkIAMSecurity(): Promise<ComplianceIssue[]> {
    const issues: ComplianceIssue[] = [];

    try {
      const iamClient = new IAMClient({ region: 'us-east-1' }); // IAM is global
      const { Users } = await iamClient.send(new ListUsersCommand({}));

      for (const user of Users || []) {
        if (!user.UserName || !user.Arn) continue;

        // Check if user has MFA enabled
        try {
          const { MFADevices } = await iamClient.send(
            new ListMFADevicesCommand({ UserName: user.UserName })
          );

          if (!MFADevices || MFADevices.length === 0) {
            issues.push({
              severity: 'high',
              category: 'iam',
              issue: `IAM user "${user.UserName}" does not have MFA enabled`,
              recommendation: 'Enable multi-factor authentication (MFA) for all IAM users, especially those with console access.',
              resource_arn: user.Arn,
            });
          }
        } catch (error: any) {
          console.error(`[Compliance] Error checking MFA for user ${user.UserName}:`, error.message);
        }

        // Check for old access keys (>90 days)
        try {
          const { AccessKeyMetadata } = await iamClient.send(
            new ListAccessKeysCommand({ UserName: user.UserName })
          );

          for (const key of AccessKeyMetadata || []) {
            if (!key.CreateDate || !key.AccessKeyId) continue;

            const ageInDays = Math.floor(
              (Date.now() - key.CreateDate.getTime()) / (1000 * 60 * 60 * 24)
            );

            if (ageInDays > 90) {
              issues.push({
                severity: 'medium',
                category: 'iam',
                issue: `IAM user "${user.UserName}" has an access key (${key.AccessKeyId}) that is ${ageInDays} days old`,
                recommendation: 'Rotate access keys every 90 days. Create a new key, update applications, then delete the old key.',
                resource_arn: user.Arn,
              });
            }

            // Warning for very old keys (>180 days)
            if (ageInDays > 180) {
              issues.push({
                severity: 'high',
                category: 'iam',
                issue: `IAM user "${user.UserName}" has an access key (${key.AccessKeyId}) that is ${ageInDays} days old (>180 days)`,
                recommendation: 'URGENT: Rotate this access key immediately. Keys over 180 days old pose a significant security risk.',
                resource_arn: user.Arn,
              });
            }
          }
        } catch (error: any) {
          console.error(`[Compliance] Error checking access keys for user ${user.UserName}:`, error.message);
        }
      }
    } catch (error: any) {
      console.error('[Compliance] Error checking IAM security:', error.message);
    }

    return issues;
  }
}
