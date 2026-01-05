/**
 * Risk Scoring Algorithm
 * Calculates security posture score (0-100) for AWS resources
 * Lower score = higher risk
 */

export interface RiskFactors {
  totalResources: number;
  unencryptedCount: number;
  publicCount: number;
  missingBackupCount: number;
  complianceIssues: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  orphanedCount: number;
}

export interface RiskScore {
  score: number; // 0-100
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  color: string;
  label: string;
  trend: 'improving' | 'stable' | 'declining';
  factors: {
    encryption: number;
    publicAccess: number;
    backup: number;
    compliance: number;
    resourceManagement: number;
  };
}

/**
 * Calculate overall risk score (0-100)
 * 100 = Perfect security posture
 * 0 = Maximum risk
 */
export function calculateRiskScore(factors: RiskFactors): RiskScore {
  const { totalResources, unencryptedCount, publicCount, missingBackupCount, complianceIssues, orphanedCount } = factors;

  // Prevent division by zero
  if (totalResources === 0) {
    return {
      score: 100,
      grade: 'A',
      color: 'text-green-600',
      label: 'Excellent',
      trend: 'stable',
      factors: {
        encryption: 100,
        publicAccess: 100,
        backup: 100,
        compliance: 100,
        resourceManagement: 100,
      },
    };
  }

  // Calculate individual factor scores (0-100 each)

  // 1. Encryption Score (25% weight)
  const encryptionScore = Math.max(0, 100 - (unencryptedCount / totalResources) * 100);

  // 2. Public Access Score (30% weight) - most critical
  const publicAccessScore = Math.max(0, 100 - (publicCount / totalResources) * 150); // Heavily penalized

  // 3. Backup Score (15% weight)
  const backupScore = Math.max(0, 100 - (missingBackupCount / totalResources) * 100);

  // 4. Compliance Score (25% weight)
  const totalIssues = complianceIssues.critical + complianceIssues.high + complianceIssues.medium + complianceIssues.low;
  const criticalPenalty = complianceIssues.critical * 20; // Critical issues are heavily weighted
  const highPenalty = complianceIssues.high * 10;
  const mediumPenalty = complianceIssues.medium * 5;
  const lowPenalty = complianceIssues.low * 2;
  const complianceScore = Math.max(0, 100 - (criticalPenalty + highPenalty + mediumPenalty + lowPenalty) / totalResources);

  // 5. Resource Management Score (5% weight)
  const resourceManagementScore = Math.max(0, 100 - (orphanedCount / totalResources) * 50);

  // Calculate weighted overall score
  const overallScore = Math.round(
    encryptionScore * 0.25 +
    publicAccessScore * 0.30 +
    backupScore * 0.15 +
    complianceScore * 0.25 +
    resourceManagementScore * 0.05
  );

  // Determine grade
  let grade: 'A' | 'B' | 'C' | 'D' | 'F';
  let color: string;
  let label: string;

  if (overallScore >= 90) {
    grade = 'A';
    color = 'text-green-600';
    label = 'Excellent';
  } else if (overallScore >= 80) {
    grade = 'B';
    color = 'text-green-500';
    label = 'Good';
  } else if (overallScore >= 70) {
    grade = 'C';
    color = 'text-yellow-600';
    label = 'Fair';
  } else if (overallScore >= 60) {
    grade = 'D';
    color = 'text-orange-600';
    label = 'Poor';
  } else {
    grade = 'F';
    color = 'text-red-600';
    label = 'Critical';
  }

  // Determine trend (simplified - in production, compare with historical data)
  let trend: 'improving' | 'stable' | 'declining' = 'stable';
  if (complianceIssues.critical > 0 || publicCount > 3) {
    trend = 'declining';
  } else if (overallScore >= 85) {
    trend = 'improving';
  }

  return {
    score: overallScore,
    grade,
    color,
    label,
    trend,
    factors: {
      encryption: Math.round(encryptionScore),
      publicAccess: Math.round(publicAccessScore),
      backup: Math.round(backupScore),
      compliance: Math.round(complianceScore),
      resourceManagement: Math.round(resourceManagementScore),
    },
  };
}

/**
 * Detect compliance frameworks at risk
 */
export function detectFrameworksAtRisk(complianceIssues: any[]): string[] {
  const frameworks: string[] = [];

  complianceIssues.forEach(issue => {
    if (issue.severity === 'critical' || issue.severity === 'high') {
      // SOC 2
      if (
        issue.category?.includes('encryption') ||
        issue.category?.includes('access-control') ||
        issue.category?.includes('logging')
      ) {
        if (!frameworks.includes('SOC 2')) frameworks.push('SOC 2');
      }

      // HIPAA
      if (
        issue.category?.includes('encryption') ||
        issue.category?.includes('backup') ||
        issue.category?.includes('audit')
      ) {
        if (!frameworks.includes('HIPAA')) frameworks.push('HIPAA');
      }

      // PCI DSS
      if (
        issue.category?.includes('encryption') ||
        issue.category?.includes('network') ||
        issue.category?.includes('public')
      ) {
        if (!frameworks.includes('PCI DSS')) frameworks.push('PCI DSS');
      }

      // GDPR
      if (
        issue.category?.includes('encryption') ||
        issue.category?.includes('data-retention') ||
        issue.category?.includes('access')
      ) {
        if (!frameworks.includes('GDPR')) frameworks.push('GDPR');
      }
    }
  });

  return frameworks;
}

/**
 * Calculate days exposed for public resources
 */
export function calculateDaysExposed(firstDiscoveredAt: string | Date): number {
  const discovered = new Date(firstDiscoveredAt);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - discovered.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

/**
 * Calculate resource-level risk score
 */
export function calculateResourceRisk(resource: any): number {
  let riskScore = 0;

  // Public access is highest risk
  if (resource.is_public) riskScore += 40;

  // Unencrypted is high risk
  if (!resource.is_encrypted) riskScore += 25;

  // No backup is medium risk
  if (!resource.has_backup) riskScore += 15;

  // Critical compliance issues
  const criticalIssues = resource.compliance_issues?.filter((i: any) => i.severity === 'critical').length || 0;
  const highIssues = resource.compliance_issues?.filter((i: any) => i.severity === 'high').length || 0;
  riskScore += criticalIssues * 10 + highIssues * 5;

  return Math.min(100, riskScore); // Cap at 100
}
