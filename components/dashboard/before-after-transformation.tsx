/**
 * Before/After Transformation
 * Shows the journey and ROI payback period
 *
 * "11 day payback period - after that, pure profit"
 */

'use client';

import { ArrowRight, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SALES_DEMO_DATA } from '@/lib/demo/sales-demo-data';

interface BeforeAfterProps {
  demoMode?: boolean;
  realData?: {
    daysSinceStart: number;
    before: {
      deployFrequency: string;
      costVisibility: string;
      securityAudits: string;
      mttr: string;
      complianceReports: string;
      costWasteFound: string;
    };
    after: {
      deployFrequency: string;
      costVisibility: string;
      securityAudits: string;
      mttr: string;
      complianceReports: string;
      costWasteFound: string;
    };
    improvements: {
      deploySpeed: string;
      mttrReduction: string;
    };
    paybackDays: number;
  };
}

export function BeforeAfterTransformation({ demoMode = false, realData }: BeforeAfterProps) {
  const data = demoMode ? SALES_DEMO_DATA.transformation : realData;

  if (!data) return null;

  const metrics = [
    {
      label: 'Deploy Frequency',
      before: data.before.deployFrequency,
      after: data.after.deployFrequency,
      improvement: demoMode ? SALES_DEMO_DATA.transformation.improvements.deploySpeed : null,
    },
    {
      label: 'AWS Cost Visibility',
      before: data.before.costVisibility,
      after: data.after.costVisibility,
      improvement: null,
    },
    {
      label: 'Security Audits',
      before: data.before.securityAudits,
      after: data.after.securityAudits,
      improvement: null,
    },
    {
      label: 'MTTR',
      before: data.before.mttr,
      after: data.after.mttr,
      improvement: demoMode ? SALES_DEMO_DATA.transformation.improvements.mttrReduction : null,
    },
    {
      label: 'Compliance Reports',
      before: data.before.complianceReports,
      after: data.after.complianceReports,
      improvement: null,
    },
    {
      label: 'Cost Waste Found',
      before: data.before.costWasteFound,
      after: data.after.costWasteFound,
      improvement: null,
    },
  ];

  return (
    <Card className="border-2 border-indigo-200 hover:shadow-lg transition-all">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-indigo-700" />
            </div>
            <div>
              <CardTitle className="text-xl">Your Transformation</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {data.daysSinceStart} days with DevControl
              </p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-indigo-200">
                <th className="text-left py-3 px-2 font-semibold text-gray-700">Metric</th>
                <th className="text-left py-3 px-2 font-semibold text-red-700">Before (Manual)</th>
                <th className="w-8"></th>
                <th className="text-left py-3 px-2 font-semibold text-green-700">After (DevControl)</th>
                <th className="text-right py-3 px-2 font-semibold text-indigo-700">Impact</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((metric, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-indigo-50 transition-colors">
                  <td className="py-3 px-2 font-medium text-gray-900">{metric.label}</td>
                  <td className="py-3 px-2 text-red-700">{metric.before}</td>
                  <td className="py-3 px-2 text-center">
                    <ArrowRight className="h-4 w-4 text-indigo-600 mx-auto" />
                  </td>
                  <td className="py-3 px-2 text-green-700 font-semibold">{metric.after}</td>
                  <td className="py-3 px-2 text-right">
                    {metric.improvement ? (
                      <span className="inline-flex items-center px-2 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold">
                        📈 {metric.improvement}
                      </span>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Payback Period */}
        <div className="pt-4 border-t">
          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg p-4 border-2 border-amber-300">
            <div className="flex items-start gap-3">
              <span className="text-3xl">💡</span>
              <div>
                <p className="font-bold text-amber-900 text-xl mb-1">
                  ROI Payback Period: {data.paybackDays} days
                </p>
                <p className="text-amber-700 font-medium">
                  After {data.paybackDays} days, DevControl paid for itself. Everything after is pure savings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
