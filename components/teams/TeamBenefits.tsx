'use client'

import { Target, DollarSign, TrendingUp, Shield } from 'lucide-react';

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
  metric: string;
}

export function TeamBenefits() {
  const benefits: Benefit[] = [
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Clear Ownership',
      description: 'Know exactly who owns what',
      benefits: [
        'Assign services to specific teams',
        'Track ownership changes over time',
        'Contact info for on-call rotation',
        'Service catalog with team attribution',
      ],
      metric: '100% service accountability',
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: 'Cost Attribution',
      description: 'Track AWS costs by team',
      benefits: [
        'See AWS spend per team',
        'Set team-level budgets',
        'Chargeback reporting',
        'Cost trends and forecasts',
      ],
      metric: 'Average 23% cost reduction',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Performance Tracking',
      description: 'Measure team velocity',
      benefits: [
        'Deployment frequency by team',
        'DORA metrics per team',
        'Lead time and MTTR',
        'Team performance comparisons',
      ],
      metric: 'Data-driven improvements',
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Compliance & Security',
      description: 'Team-level compliance tracking',
      benefits: [
        'Security issues by team',
        'Compliance score tracking',
        'Audit trail of changes',
        'Policy enforcement',
      ],
      metric: 'Better accountability',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          🎯 Why Organize by Teams?
        </h3>
        <p className="text-gray-600">
          Get visibility, accountability, and insights across your organization
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border-l-4 border-blue-500 shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            {/* Icon + Title */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                {benefit.icon}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  {benefit.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {benefit.description}
                </p>
              </div>
            </div>

            {/* Benefits List */}
            <ul className="space-y-2 mb-4">
              {benefit.benefits.map((item, idx) => (
                <li key={idx} className="flex items-start text-sm text-gray-600">
                  <span className="text-green-500 mr-2 mt-0.5">•</span>
                  {item}
                </li>
              ))}
            </ul>

            {/* Metric */}
            <div className="pt-4 border-t border-gray-100">
              <p className="text-sm font-medium text-blue-600">
                ✨ {benefit.metric}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
