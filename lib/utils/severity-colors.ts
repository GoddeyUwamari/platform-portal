export type SeverityLevel = 'critical' | 'high' | 'medium' | 'low' | 'info' | 'success';

export interface SeverityColors {
  bg: string;
  border: string;
  text: string;
  badge: string;
}

export function getSeverityColors(severity: SeverityLevel): SeverityColors {
  const colors: Record<SeverityLevel, SeverityColors> = {
    critical: {
      bg: 'bg-red-50 dark:bg-red-900/10',
      border: 'border-red-200 dark:border-red-800',
      text: 'text-red-900 dark:text-red-100',
      badge: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800',
    },
    high: {
      bg: 'bg-amber-50 dark:bg-amber-900/10',
      border: 'border-amber-200 dark:border-amber-800',
      text: 'text-amber-900 dark:text-amber-100',
      badge: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800',
    },
    medium: {
      bg: 'bg-orange-50 dark:bg-orange-900/10',
      border: 'border-orange-200 dark:border-orange-800',
      text: 'text-orange-900 dark:text-orange-100',
      badge: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800',
    },
    low: {
      bg: 'bg-blue-50 dark:bg-blue-900/10',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-900 dark:text-blue-100',
      badge: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    },
    info: {
      bg: 'bg-gray-50 dark:bg-gray-900/10',
      border: 'border-gray-200 dark:border-gray-800',
      text: 'text-gray-900 dark:text-gray-100',
      badge: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700',
    },
    success: {
      bg: 'bg-green-50 dark:bg-green-900/10',
      border: 'border-green-200 dark:border-green-800',
      text: 'text-green-900 dark:text-green-100',
      badge: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800',
    },
  };

  return colors[severity];
}

export function getSecuritySeverity(issue: string): SeverityLevel {
  const critical = ['exposed', 'public', 'root access', 'admin access'];
  const high = ['unencrypted', 'no mfa', 'weak password'];
  const medium = ['outdated', 'missing tags', 'no backup'];
  const low = ['optimization', 'recommendation'];

  const issueLower = issue.toLowerCase();

  if (critical.some(keyword => issueLower.includes(keyword))) return 'critical';
  if (high.some(keyword => issueLower.includes(keyword))) return 'high';
  if (medium.some(keyword => issueLower.includes(keyword))) return 'medium';
  return 'low';
}
