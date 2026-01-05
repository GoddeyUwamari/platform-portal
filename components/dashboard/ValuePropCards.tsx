/**
 * ValuePropCards Component
 * Display key value propositions with metrics
 */

'use client';

import React from 'react';
import { DollarSign, Shield, Activity, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ValueCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  metric: string;
  bgColor: string;
}

const valueCards: ValueCard[] = [
  {
    icon: <DollarSign className="h-10 w-10" />,
    title: 'Reduce AWS Costs',
    description: 'Identify waste and optimize spending',
    metric: 'Average savings: $1,200/month',
    bgColor: 'bg-green-100 text-green-700',
  },
  {
    icon: <Shield className="h-10 w-10" />,
    title: 'Stay Secure',
    description: 'Real-time security risk detection',
    metric: '100,000+ resources scanned',
    bgColor: 'bg-blue-100 text-blue-700',
  },
  {
    icon: <Activity className="h-10 w-10" />,
    title: 'Track Everything',
    description: 'Monitor all services and deployments',
    metric: '500+ teams trust DevControl',
    bgColor: 'bg-purple-100 text-purple-700',
  },
  {
    icon: <TrendingUp className="h-10 w-10" />,
    title: 'Measure Performance',
    description: 'Automated DORA metrics tracking',
    metric: 'Zero manual reporting',
    bgColor: 'bg-orange-100 text-orange-700',
  },
];

export function ValuePropCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {valueCards.map((card, index) => (
        <Card
          key={index}
          className="group border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-[#635BFF]/30 animate-in fade-in slide-in-from-bottom-4"
          style={{ animationDelay: `${index * 100}ms`, animationDuration: '600ms' }}
        >
          <CardContent className="p-6">
            {/* Icon */}
            <div className={`mb-4 inline-flex rounded-lg p-3 transition-transform duration-300 group-hover:scale-110 ${card.bgColor}`}>
              {card.icon}
            </div>

            {/* Title */}
            <h3 className="mb-2 text-lg font-bold text-gray-900">
              {card.title}
            </h3>

            {/* Description */}
            <p className="mb-3 text-sm text-gray-600">
              {card.description}
            </p>

            {/* Metric */}
            <p className="text-sm font-semibold text-[#635BFF]">
              {card.metric}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
