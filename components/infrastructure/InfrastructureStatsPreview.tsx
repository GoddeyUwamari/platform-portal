'use client';

import { useState } from 'react';
import { DollarSign, Server, TrendingUp, Lightbulb } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface StatCard {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  description: string;
  color: string;
}

interface Scenario {
  id: string;
  label: string;
  companyType: string;
  stats: StatCard[];
  insight: string;
}

export function InfrastructureStatsPreview() {
  const [selectedScenario, setSelectedScenario] = useState('saas-startup');

  const scenarios: Scenario[] = [
    {
      id: 'saas-startup',
      label: 'SaaS Startup',
      companyType: 'Series A · 20-50 employees',
      stats: [
        {
          icon: <DollarSign className="w-6 h-6" />,
          title: 'Monthly AWS Spend',
          value: '$12,400',
          subtitle: 'per month',
          description: 'Across 3 environments',
          color: 'blue',
        },
        {
          icon: <Server className="w-6 h-6" />,
          title: 'Resources Tracked',
          value: '247',
          subtitle: 'resources',
          description: '2 AWS accounts',
          color: 'green',
        },
        {
          icon: <Lightbulb className="w-6 h-6" />,
          title: 'Savings Identified',
          value: '$2,100',
          subtitle: 'per month',
          description: '3 optimizations',
          color: 'orange',
        },
        {
          icon: <TrendingUp className="w-6 h-6" />,
          title: 'Cost Trend',
          value: '↗ +8%',
          subtitle: 'vs last month',
          description: 'Forecast: $13.4K',
          color: 'purple',
        },
      ],
      insight: '3 unused RDS instances in staging environment',
    },
    {
      id: 'ecommerce',
      label: 'E-commerce',
      companyType: 'Growth Stage · 100-200 employees',
      stats: [
        {
          icon: <DollarSign className="w-6 h-6" />,
          title: 'Monthly AWS Spend',
          value: '$48,200',
          subtitle: 'per month',
          description: 'Multi-region setup',
          color: 'blue',
        },
        {
          icon: <Server className="w-6 h-6" />,
          title: 'Resources Tracked',
          value: '1,243',
          subtitle: 'resources',
          description: '5 AWS accounts',
          color: 'green',
        },
        {
          icon: <Lightbulb className="w-6 h-6" />,
          title: 'Savings Identified',
          value: '$8,400',
          subtitle: 'per month',
          description: '12 optimizations',
          color: 'orange',
        },
        {
          icon: <TrendingUp className="w-6 h-6" />,
          title: 'Cost Trend',
          value: '↗ +15%',
          subtitle: 'vs last month',
          description: 'Peak season spike',
          color: 'purple',
        },
      ],
      insight: 'Over-provisioned EC2 instances during off-peak hours',
    },
    {
      id: 'fintech',
      label: 'FinTech',
      companyType: 'Enterprise · 500+ employees',
      stats: [
        {
          icon: <DollarSign className="w-6 h-6" />,
          title: 'Monthly AWS Spend',
          value: '$87,500',
          subtitle: 'per month',
          description: 'Global infrastructure',
          color: 'blue',
        },
        {
          icon: <Server className="w-6 h-6" />,
          title: 'Resources Tracked',
          value: '2,891',
          subtitle: 'resources',
          description: '12 AWS accounts',
          color: 'green',
        },
        {
          icon: <Lightbulb className="w-6 h-6" />,
          title: 'Savings Identified',
          value: '$12,300',
          subtitle: 'per month',
          description: '18 optimizations',
          color: 'orange',
        },
        {
          icon: <TrendingUp className="w-6 h-6" />,
          title: 'Cost Trend',
          value: '↘ -3%',
          subtitle: 'vs last month',
          description: 'Optimization working',
          color: 'purple',
        },
      ],
      insight: 'Orphaned EBS volumes from old deployments across regions',
    },
  ];

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
    purple: 'bg-purple-100 text-purple-600',
  };

  const currentScenario = scenarios.find(s => s.id === selectedScenario) || scenarios[0];

  return (
    <div>
      {/* Preview Mode Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 rounded-lg p-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex-1">
            <p className="text-lg font-semibold text-gray-900 mb-1">
              See Your Infrastructure Insights
            </p>
            <p className="text-sm text-muted-foreground">
              Select a scenario below that matches your company profile to see example insights
            </p>
          </div>
          <button className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 whitespace-nowrap">
            Connect AWS →
          </button>
        </div>
      </div>

      {/* Scenario Selector */}
      <Tabs value={selectedScenario} onValueChange={setSelectedScenario} className="mb-6">
        <TabsList className="grid w-full grid-cols-3">
          {scenarios.map((scenario) => (
            <TabsTrigger key={scenario.id} value={scenario.id} className="flex flex-col py-3">
              <span className="font-semibold">{scenario.label}</span>
              <span className="text-xs text-muted-foreground hidden sm:inline">{scenario.companyType}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
        {currentScenario.stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                {stat.icon}
              </div>
            </div>

            <h3 className="text-sm font-medium text-gray-600 mb-2">
              {stat.title}
            </h3>

            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-bold text-gray-900">
                {stat.value}
              </span>
              <span className="text-sm text-gray-500">
                {stat.subtitle}
              </span>
            </div>

            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      {/* Top Insight */}
      <div className="bg-amber-50 border-l-4 border-amber-500 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-gray-900 mb-1">Top Cost Saving Opportunity</p>
            <p className="text-sm text-gray-700">{currentScenario.insight}</p>
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground mt-4">
        Example scenarios based on real customer data. Connect your AWS account to see your actual costs.
      </p>
    </div>
  );
}
