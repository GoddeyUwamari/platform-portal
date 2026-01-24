'use client';

import { Shield, AlertTriangle, CheckCircle, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface SecurityInsightsBannerProps {
  criticalIssues: number;
  warnings: number;
  recommendations: number;
  onViewDetails?: () => void;
  onDismiss?: () => void;
}

export function SecurityInsightsBanner({
  criticalIssues,
  warnings,
  recommendations,
  onViewDetails,
  onDismiss,
}: SecurityInsightsBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const totalIssues = criticalIssues + warnings + recommendations;
  const hasCritical = criticalIssues > 0;
  const hasIssues = totalIssues > 0;

  // Don't show if no issues
  if (!hasIssues) return null;

  // Determine banner style based on severity
  const variant = hasCritical ? 'critical' : warnings > 0 ? 'warning' : 'info';

  const variantStyles = {
    critical: {
      bg: 'bg-red-50 dark:bg-red-900/10',
      border: 'border-red-200 dark:border-red-800',
      iconBg: 'bg-red-100 dark:bg-red-900/30',
      iconColor: 'text-red-600 dark:text-red-400',
      textColor: 'text-red-900 dark:text-red-100',
      icon: AlertTriangle,
    },
    warning: {
      bg: 'bg-amber-50 dark:bg-amber-900/10',
      border: 'border-amber-200 dark:border-amber-800',
      iconBg: 'bg-amber-100 dark:bg-amber-900/30',
      iconColor: 'text-amber-600 dark:text-amber-400',
      textColor: 'text-amber-900 dark:text-amber-100',
      icon: Shield,
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/10',
      border: 'border-blue-200 dark:border-blue-800',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30',
      iconColor: 'text-blue-600 dark:text-blue-400',
      textColor: 'text-blue-900 dark:text-blue-100',
      icon: CheckCircle,
    },
  };

  const style = variantStyles[variant];
  const Icon = style.icon;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <div
      className={cn(
        'flex items-start gap-4 px-6 py-4 rounded-lg border mb-6',
        style.bg,
        style.border
      )}
    >
      {/* Icon */}
      <div className={cn('p-2 rounded-lg flex-shrink-0', style.iconBg)}>
        <Icon className={cn('w-5 h-5', style.iconColor)} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className={cn('text-base font-semibold mb-1', style.textColor)}>
          {hasCritical
            ? `${criticalIssues} Critical Security ${criticalIssues === 1 ? 'Issue' : 'Issues'} Detected`
            : warnings > 0
            ? `${warnings} Security ${warnings === 1 ? 'Improvement' : 'Improvements'} Available`
            : `${recommendations} ${recommendations === 1 ? 'Recommendation' : 'Recommendations'} Available`}
        </h3>

        <div className={cn('text-sm space-y-1', style.textColor)}>
          {criticalIssues > 0 && (
            <p>
              • {criticalIssues} resource{criticalIssues > 1 ? 's' : ''} require immediate attention
            </p>
          )}
          {warnings > 0 && (
            <p>
              • {warnings} resource{warnings > 1 ? 's' : ''} can be improved for better security
            </p>
          )}
          {recommendations > 0 && (
            <p>
              • {recommendations} optimization{recommendations > 1 ? 's' : ''} available
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {onViewDetails && (
          <Button
            onClick={onViewDetails}
            variant="outline"
            size="sm"
            className={cn('border-current', style.textColor)}
          >
            View Details
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}

        <Button
          onClick={handleDismiss}
          variant="ghost"
          size="sm"
          className={cn('hover:bg-white/50 dark:hover:bg-black/20', style.textColor)}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
