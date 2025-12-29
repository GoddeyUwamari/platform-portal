import {
  AWSResource,
  ComplianceIssue,
  ComplianceSeverity,
  ComplianceCategory,
} from '../types/aws-resources.types';

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
}
