'use client';

import { Check, X, Minus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ComparisonFeature {
  feature: string;
  devcontrol: string | boolean;
  awsCostExplorer: string | boolean;
  manualTracking: string | boolean;
}

export function InfrastructureComparison() {
  const features: ComparisonFeature[] = [
    {
      feature: 'Data refresh frequency',
      devcontrol: 'Automatic sync',
      awsCostExplorer: '24-hour delay',
      manualTracking: 'Weekly at best',
    },
    {
      feature: 'Multi-account unified view',
      devcontrol: 'Single dashboard',
      awsCostExplorer: 'Switch accounts',
      manualTracking: 'Spreadsheets',
    },
    {
      feature: 'Cost spike alerts',
      devcontrol: true,
      awsCostExplorer: 'Basic only',
      manualTracking: false,
    },
    {
      feature: 'Automated resource tracking',
      devcontrol: 'All resources',
      awsCostExplorer: 'Limited',
      manualTracking: 'Error-prone',
    },
    {
      feature: 'Setup time',
      devcontrol: '3 minutes',
      awsCostExplorer: '30+ minutes',
      manualTracking: 'Hours weekly',
    },
    {
      feature: 'Smart recommendations',
      devcontrol: true,
      awsCostExplorer: false,
      manualTracking: false,
    },
    {
      feature: 'Team collaboration',
      devcontrol: true,
      awsCostExplorer: 'Limited',
      manualTracking: false,
    },
    {
      feature: 'Custom integrations',
      devcontrol: 'Slack, Email, Webhooks',
      awsCostExplorer: 'Email only',
      manualTracking: false,
    },
  ];

  const renderValue = (value: string | boolean, isDevControl: boolean = false) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className={`w-5 h-5 ${isDevControl ? 'text-green-600' : 'text-gray-400'}`} />
      ) : (
        <X className="w-5 h-5 text-red-400" />
      );
    }

    // Check for limitation keywords
    const isLimited = value.toLowerCase().includes('limited') ||
                     value.toLowerCase().includes('basic') ||
                     value.toLowerCase().includes('delay') ||
                     value.toLowerCase().includes('error') ||
                     value.toLowerCase().includes('spreadsheet');

    return (
      <span className={`text-sm ${isDevControl ? 'font-semibold text-gray-900' : isLimited ? 'text-muted-foreground' : 'text-gray-700'}`}>
        {value}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
          Why Choose DevControl Over AWS Native Tools?
        </h2>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto">
          See how DevControl delivers superior insights and saves your team hours of manual work
        </p>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-slate-50">
                  <th className="text-left p-4 font-semibold text-gray-900">Feature</th>
                  <th className="text-center p-4 bg-blue-50 border-l-4 border-blue-500">
                    <div className="font-bold text-gray-900 text-lg">DevControl</div>
                    <div className="text-xs text-muted-foreground font-normal mt-1">Premium Platform</div>
                  </th>
                  <th className="text-center p-4 font-semibold text-gray-700">AWS Cost Explorer</th>
                  <th className="text-center p-4 font-semibold text-gray-700">Manual Tracking</th>
                </tr>
              </thead>
              <tbody>
                {features.map((feature, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-gray-900">{feature.feature}</td>
                    <td className="p-4 text-center bg-blue-50/30 border-l-4 border-blue-500">
                      {renderValue(feature.devcontrol, true)}
                    </td>
                    <td className="p-4 text-center">
                      {renderValue(feature.awsCostExplorer)}
                    </td>
                    <td className="p-4 text-center">
                      {renderValue(feature.manualTracking)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Accordion View */}
      <div className="md:hidden space-y-4">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="font-semibold text-gray-900 mb-3">{feature.feature}</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded border-l-4 border-blue-500">
                  <span className="text-sm font-medium">DevControl</span>
                  <div>{renderValue(feature.devcontrol, true)}</div>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600">AWS Cost Explorer</span>
                  <div>{renderValue(feature.awsCostExplorer)}</div>
                </div>
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600">Manual Tracking</span>
                  <div>{renderValue(feature.manualTracking)}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center pt-4">
        <p className="text-sm font-medium text-gray-700">
          Switch from manual tracking or AWS Cost Explorer in minutes—no migration hassle
        </p>
      </div>
    </div>
  );
}
