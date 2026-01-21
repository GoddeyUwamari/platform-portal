import { DollarSign, Clock, Shield, Zap } from 'lucide-react';
import { PLATFORM_METRICS, getMetric } from '@/lib/constants/metrics';

/**
 * InfrastructureMetricsBanner Component
 *
 * Displays key platform metrics using centralized values from lib/constants/metrics.ts
 * Only shows verifiable metrics - unverifiable metrics replaced with operational facts
 */

interface Metric {
  icon: React.ReactNode;
  value: string;
  label: string;
  iconColor: string;
}

export function InfrastructureMetricsBanner() {
  const metrics: Metric[] = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      value: getMetric('avgMonthlySavings', '$2,400'),
      label: 'Avg Monthly Savings',
      iconColor: 'text-green-600',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      value: getMetric('setupTime', '3 min'),
      label: 'Average Setup Time',
      iconColor: 'text-blue-600',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      value: getMetric('avgROI', '8-10x'),
      label: 'Average ROI',
      iconColor: 'text-purple-600',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      value: getMetric('uptimeSLA', '99.9%'),
      label: 'Uptime SLA',
      iconColor: 'text-orange-600',
    },
  ];

  return (
    <div className="bg-gradient-to-r from-slate-50 via-blue-50 to-slate-50 rounded-lg border border-slate-200 p-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {metrics.map((metric, index) => (
          <div key={index} className="text-center relative">
            {/* Divider (not on last item on desktop) */}
            {index < metrics.length - 1 && (
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-16 w-px bg-slate-300" />
            )}

            {/* Icon */}
            <div className="flex justify-center mb-3">
              <div className={`${metric.iconColor}`}>
                {metric.icon}
              </div>
            </div>

            {/* Value */}
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {metric.value}
            </div>

            {/* Label */}
            <div className="text-sm text-muted-foreground font-medium">
              {metric.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
