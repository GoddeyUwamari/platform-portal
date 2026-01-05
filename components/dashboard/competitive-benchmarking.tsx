/**
 * Competitive Benchmarking
 * Shows how the team stacks up against industry
 *
 * "Top 10% Elite tier - companies like yours grow 2.5x faster"
 */

'use client';

import { Trophy, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SALES_DEMO_DATA } from '@/lib/demo/sales-demo-data';

interface CompetitiveBenchmarkingProps {
  demoMode?: boolean;
  realData?: {
    benchmarks: Array<{
      category: string;
      yourValue: string;
      industryAvg: string;
      rank: string;
      medal: '🥇' | '🥈' | '🥉' | '';
    }>;
    overallRank: string;
    eliteTier: boolean;
  };
}

export function CompetitiveBenchmarking({ demoMode = false, realData }: CompetitiveBenchmarkingProps) {
  const data = demoMode ? SALES_DEMO_DATA : realData;

  if (!data) return null;

  const eliteStats = demoMode ? SALES_DEMO_DATA.eliteStats : null;

  return (
    <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 hover:shadow-lg transition-all">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-amber-500/30 flex items-center justify-center">
              <Trophy className="h-6 w-6 text-amber-700" />
            </div>
            <div>
              <CardTitle className="text-xl">How You Stack Up</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Your Team vs Industry
              </p>
            </div>
          </div>
          {data.eliteTier && (
            <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-amber-900 border-2 border-amber-600 text-lg px-4 py-2 shadow-md">
              🏆 {data.overallRank} (ELITE)
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Overall Percentile */}
        <div className="text-center py-3 bg-white/60 rounded-lg border-2 border-amber-300">
          <p className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-1">
            Overall Performance
          </p>
          <p className="text-3xl font-bold text-amber-900">
            You're outperforming{' '}
            {demoMode ? `${100 - parseInt(SALES_DEMO_DATA.overallRank.match(/\d+/)?.[0] || '10')}%` : '85%'}{' '}
            of similar companies
          </p>
        </div>

        {/* Benchmark Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-amber-300">
                <th className="text-left py-3 px-2 font-semibold text-gray-700">Category</th>
                <th className="text-center py-3 px-2 font-semibold text-blue-700">Your Team</th>
                <th className="text-center py-3 px-2 font-semibold text-gray-600">Industry Avg</th>
                <th className="text-center py-3 px-2 font-semibold text-amber-700">Your Rank</th>
              </tr>
            </thead>
            <tbody>
              {data.benchmarks.map((benchmark, index) => (
                <tr key={index} className="border-b border-amber-200 hover:bg-white/40 transition-colors">
                  <td className="py-3 px-2 font-medium text-gray-900">{benchmark.category}</td>
                  <td className="py-3 px-2 text-center font-bold text-blue-700">
                    {benchmark.yourValue}
                  </td>
                  <td className="py-3 px-2 text-center text-gray-600">
                    {benchmark.industryAvg}
                  </td>
                  <td className="py-3 px-2 text-center">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-300">
                      {benchmark.medal && <span className="text-base">{benchmark.medal}</span>}
                      {benchmark.rank}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Elite Tier Benefits */}
        {data.eliteTier && eliteStats && (
          <div className="pt-4 border-t-2 border-amber-300">
            <div className="bg-gradient-to-r from-yellow-100 to-amber-100 rounded-lg p-4 border-2 border-amber-400">
              <div className="flex items-start gap-3">
                <span className="text-3xl">🔥</span>
                <div className="space-y-2">
                  <p className="font-bold text-amber-900 text-lg mb-2">
                    YOU'RE IN THE {data.overallRank} (ELITE TIER)
                  </p>
                  <div className="space-y-1 text-sm text-amber-800">
                    <p className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      <span>
                        <span className="font-bold">{eliteStats.revenueGrowthMultiplier}x higher revenue growth</span>{' '}
                        than average companies
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      <span>
                        <span className="font-bold">{eliteStats.turnoverReduction}% lower turnover</span>{' '}
                        (better retention)
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      <span>
                        <span className="font-bold">{eliteStats.timeToMarketImprovement}% faster time-to-market</span>{' '}
                        (competitive advantage)
                      </span>
                    </p>
                  </div>
                  <p className="text-xs text-amber-600 italic mt-2">
                    Source: State of DevOps Report
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
