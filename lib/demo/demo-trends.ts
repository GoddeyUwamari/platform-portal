import { calculateTrend, StatWithTrend } from '@/types/trends';
import { Network, AlertTriangle, Activity, RefreshCcw } from 'lucide-react';

// Generate realistic sparkline data
function generateSparkline(base: number, variance: number, points: number = 7): number[] {
  const data: number[] = [];
  let current = base;

  for (let i = 0; i < points; i++) {
    current = current + (Math.random() - 0.5) * variance;
    data.push(Math.max(0, Math.round(current)));
  }

  return data;
}

export const DEMO_DEPENDENCY_STATS: StatWithTrend[] = [
  {
    label: 'Total Dependencies',
    value: 23,
    icon: Network,
    trend: {
      ...calculateTrend(23, 20, 'this week'),
      sparklineData: generateSparkline(20, 2, 7),
    },
    variant: 'default',
  },
  {
    label: 'Critical Path',
    value: 5,
    icon: AlertTriangle,
    trend: {
      ...calculateTrend(5, 7, 'vs last week'),
      sparklineData: generateSparkline(7, 1, 7),
    },
    variant: 'warning', // Lower is better, show as warning/orange
  },
  {
    label: 'Runtime Dependencies',
    value: 18,
    icon: Activity,
    trend: {
      ...calculateTrend(18, 16, 'this month'),
      sparklineData: generateSparkline(16, 1.5, 7),
    },
    variant: 'default',
  },
  {
    label: 'Circular Cycles',
    value: 0,
    icon: RefreshCcw,
    trend: {
      ...calculateTrend(0, 3, 'vs last week'),
      sparklineData: generateSparkline(3, 0.5, 7),
    },
    variant: 'success', // 0 is great - show as success/green
  },
];

// Helper function to generate sparkline data based on current stats
export function generateStatsWithTrends(
  totalDeps: number,
  criticalPath: number,
  runtimeDeps: number,
  circularCycles: number
): StatWithTrend[] {
  // Simulate previous values (80-95% of current)
  const prevTotal = Math.round(totalDeps * (0.8 + Math.random() * 0.15));
  const prevCritical = Math.round(criticalPath * (0.8 + Math.random() * 0.15));
  const prevRuntime = Math.round(runtimeDeps * (0.8 + Math.random() * 0.15));
  const prevCycles = Math.max(0, circularCycles + Math.floor(Math.random() * 3));

  return [
    {
      label: 'Total Dependencies',
      value: totalDeps,
      icon: Network,
      trend: {
        ...calculateTrend(totalDeps, prevTotal, 'this week'),
        sparklineData: generateSparkline(prevTotal, 2, 7),
      },
      variant: 'default',
    },
    {
      label: 'Critical Path',
      value: criticalPath,
      icon: AlertTriangle,
      trend: {
        ...calculateTrend(criticalPath, prevCritical, 'vs last week'),
        sparklineData: generateSparkline(prevCritical, 1, 7),
      },
      variant: 'warning',
    },
    {
      label: 'Runtime Dependencies',
      value: runtimeDeps,
      icon: Activity,
      trend: {
        ...calculateTrend(runtimeDeps, prevRuntime, 'this month'),
        sparklineData: generateSparkline(prevRuntime, 1.5, 7),
      },
      variant: 'default',
    },
    {
      label: 'Circular Cycles',
      value: circularCycles,
      icon: RefreshCcw,
      trend: {
        ...calculateTrend(circularCycles, prevCycles, 'vs last week'),
        sparklineData: generateSparkline(prevCycles, 0.5, 7),
      },
      variant: circularCycles === 0 ? 'success' : 'danger',
    },
  ];
}
