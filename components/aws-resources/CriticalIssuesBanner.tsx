/**
 * CriticalIssuesBanner Component
 * Displays an urgent, dismissible banner when critical security issues are detected
 */

'use client';

import { useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, X, Shield, Lock, Eye } from 'lucide-react';

interface CriticalIssuesBannerProps {
  criticalCount: number;
  highCount: number;
  publicCount: number;
  unencryptedCount: number;
  frameworksAtRisk: string[];
  onViewIssues?: () => void;
}

export function CriticalIssuesBanner({
  criticalCount,
  highCount,
  publicCount,
  unencryptedCount,
  frameworksAtRisk,
  onViewIssues,
}: CriticalIssuesBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  // Don't show if no critical issues
  if ((criticalCount === 0 && highCount === 0 && publicCount === 0) || isDismissed) {
    return null;
  }

  const totalIssues = criticalCount + highCount;
  const hasCritical = criticalCount > 0;

  return (
    <Alert
      className={`relative border-2 ${
        hasCritical
          ? 'border-red-500 bg-red-50 dark:bg-red-950/20'
          : 'border-orange-500 bg-orange-50 dark:bg-orange-950/20'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <AlertTriangle
            className={`h-5 w-5 mt-0.5 ${hasCritical ? 'text-red-600' : 'text-orange-600'}`}
          />
          <div className="flex-1 space-y-2">
            <AlertDescription
              className={`font-semibold text-base ${
                hasCritical ? 'text-red-900 dark:text-red-100' : 'text-orange-900 dark:text-orange-100'
              }`}
            >
              {hasCritical ? '🚨 URGENT:' : '⚠️ WARNING:'} {totalIssues}{' '}
              {hasCritical ? 'critical' : 'high-severity'} security{' '}
              {totalIssues === 1 ? 'issue' : 'issues'} detected
            </AlertDescription>

            <div className="flex flex-wrap items-center gap-2 text-sm">
              {publicCount > 0 && (
                <div className="flex items-center gap-1.5 text-red-700 dark:text-red-300">
                  <Eye className="h-4 w-4" />
                  <span className="font-medium">{publicCount} public resources</span>
                </div>
              )}
              {unencryptedCount > 0 && (
                <div className="flex items-center gap-1.5 text-red-700 dark:text-red-300">
                  <Lock className="h-4 w-4" />
                  <span className="font-medium">{unencryptedCount} unencrypted</span>
                </div>
              )}
              {frameworksAtRisk.length > 0 && (
                <div className="flex items-center gap-1.5 text-red-700 dark:text-red-300">
                  <Shield className="h-4 w-4" />
                  <span className="font-medium">
                    {frameworksAtRisk.join(', ')} at risk
                  </span>
                </div>
              )}
            </div>

            {frameworksAtRisk.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {frameworksAtRisk.map((framework) => (
                  <Badge
                    key={framework}
                    variant="destructive"
                    className="text-xs font-normal"
                  >
                    {framework} Compliance Risk
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onViewIssues && (
            <Button
              size="sm"
              variant={hasCritical ? 'destructive' : 'default'}
              onClick={onViewIssues}
            >
              View Issues
            </Button>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsDismissed(true)}
            className="shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Alert>
  );
}
