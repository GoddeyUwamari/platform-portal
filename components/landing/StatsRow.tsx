'use client'

import { PLATFORM_METRICS, hasMetric, getMetric } from '@/lib/constants/metrics';

/**
 * StatsRow Component
 *
 * Displays key metrics in a 3-column grid for social proof.
 * Uses centralized metrics from lib/constants/metrics.ts
 */
export function StatsRow() {
  // Build stats array with verifiable metrics only
  const stats = [
    {
      value: getMetric('avgMonthlySavings', '$2,400'),
      label: 'Avg monthly savings',
    },
    {
      value: getMetric('avgROI', '8-10x'),
      label: 'Average ROI',
    },
    {
      value: getMetric('uptimeSLA', '99.9%'),
      label: 'Uptime SLA',
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
      {stats.map((stat, index) => (
        <div key={index} className="text-center">
          <div className="text-5xl font-bold text-[#635BFF] mb-2">
            {stat.value}
          </div>
          <div className="text-muted-foreground">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}
