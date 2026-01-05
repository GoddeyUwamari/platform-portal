/**
 * Engineering Velocity Score
 * Transforms DORA metrics into business value language
 *
 * Technical → Business Value:
 * - "Deployment Frequency" → "Ship 8x faster than competitors"
 * - "Lead Time" → "Commit to production in half a workday"
 * - "MTTR" → "Issues fixed before customers notice"
 * - "Change Failure Rate" → "97% of deployments succeed"
 */

'use client';

import { Rocket, Zap, Wrench, CheckCircle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { SALES_DEMO_DATA } from '@/lib/demo/sales-demo-data';

interface EngineeringVelocityProps {
  demoMode?: boolean;
  realData?: {
    deployFrequency: number;
    leadTimeHours: number;
    mttrMinutes: number;
    changeFailureRate: number;
  };
}

export function EngineeringVelocity({ demoMode = false, realData }: EngineeringVelocityProps) {
  const data = demoMode ? SALES_DEMO_DATA : realData;

  if (!data) return null;

  const velocityScore = demoMode ? SALES_DEMO_DATA.velocityScore : 75;
  const percentile = demoMode ? SALES_DEMO_DATA.overallPercentile : 80;

  // Calculate tier badge color
  const getTierColor = () => {
    if (velocityScore >= 85) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    if (velocityScore >= 70) return 'bg-green-100 text-green-800 border-green-300';
    if (velocityScore >= 50) return 'bg-blue-100 text-blue-800 border-blue-300';
    return 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getTierLabel = () => {
    if (velocityScore >= 85) return 'Elite Tier';
    if (velocityScore >= 70) return 'High Tier';
    if (velocityScore >= 50) return 'Medium Tier';
    return 'Low Tier';
  };

  return (
    <Card className="border-2 border-purple-200 hover:shadow-lg transition-all">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-purple-700" />
            </div>
            <div>
              <CardTitle className="text-xl">Engineering Velocity Score</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Your team ships faster than <span className="font-bold text-purple-700">{percentile}%</span> of companies
              </p>
            </div>
          </div>
          <Badge className={`${getTierColor()} border-2 text-lg px-4 py-2`}>
            {getTierLabel()}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Overall Score */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Overall Score</span>
            <span className="text-2xl font-bold text-purple-700">{velocityScore}/100</span>
          </div>
          <Progress value={velocityScore} className="h-3" />
        </div>

        {/* Deploy Frequency */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-blue-600" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium">Deploy Frequency</span>
                <span className="text-lg font-bold">{data.deployFrequency}/day</span>
              </div>
              <p className="text-sm text-muted-foreground">
                "You ship <span className="font-semibold text-blue-700">
                  {Math.round(data.deployFrequency / 4)}x faster
                </span> than industry average (4/day)"
              </p>
            </div>
          </div>
          <div className="ml-7">
            <div className="text-xs text-green-600 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Elite: 10+/day (You: {data.deployFrequency}/day)
            </div>
          </div>
        </div>

        {/* Lead Time */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-600" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium">Lead Time</span>
                <span className="text-lg font-bold">{data.leadTimeHours}h</span>
              </div>
              <p className="text-sm text-muted-foreground">
                "From commit to production in{' '}
                <span className="font-semibold text-amber-700">
                  half a workday
                </span>"
              </p>
            </div>
          </div>
          <div className="ml-7">
            <div className="text-xs text-green-600 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Elite: &lt;1 day (You: {data.leadTimeHours}h)
            </div>
          </div>
        </div>

        {/* MTTR */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-red-600" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium">MTTR</span>
                <span className="text-lg font-bold">{data.mttrMinutes} min</span>
              </div>
              <p className="text-sm text-muted-foreground">
                "<span className="font-semibold text-red-700">
                  Issues fixed before customers notice
                </span>"
              </p>
            </div>
          </div>
          <div className="ml-7">
            <div className="text-xs text-green-600 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Elite: &lt;1 hour (You: {data.mttrMinutes}min)
            </div>
          </div>
        </div>

        {/* Change Failure Rate */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium">Change Failure Rate</span>
                <span className="text-lg font-bold">{data.changeFailureRate}%</span>
              </div>
              <p className="text-sm text-muted-foreground">
                "<span className="font-semibold text-green-700">
                  {(100 - data.changeFailureRate).toFixed(1)}% of deployments succeed
                </span> on first try"
              </p>
            </div>
          </div>
          <div className="ml-7">
            <div className="text-xs text-green-600 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Elite: &lt;5% (You: {data.changeFailureRate}%)
            </div>
          </div>
        </div>

        {/* Bottom Insight */}
        <div className="pt-4 border-t">
          <div className="bg-purple-50 rounded-lg p-4 flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div className="text-sm text-purple-900">
              <p className="font-semibold mb-1">Elite teams ship 200x more frequently than low performers</p>
              <p className="text-purple-700">
                Your {getTierLabel()} performance gives you a competitive advantage in time-to-market.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
