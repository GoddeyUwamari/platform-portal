/**
 * FeatureCard Component
 * Individual feature card with icon, preview, and description
 */

'use client';

import React from 'react';
import { ArrowRight, Check, LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  preview: React.ReactNode;
  keyPoints: string[];
  color: 'green' | 'blue' | 'purple' | 'orange' | 'cyan' | 'pink';
}

const colorClasses = {
  green: {
    iconBg: 'bg-green-100',
    iconText: 'text-green-600',
    border: 'border-green-200',
    hoverBorder: 'hover:border-green-400',
  },
  blue: {
    iconBg: 'bg-blue-100',
    iconText: 'text-blue-600',
    border: 'border-blue-200',
    hoverBorder: 'hover:border-blue-400',
  },
  purple: {
    iconBg: 'bg-purple-100',
    iconText: 'text-purple-600',
    border: 'border-purple-200',
    hoverBorder: 'hover:border-purple-400',
  },
  orange: {
    iconBg: 'bg-orange-100',
    iconText: 'text-orange-600',
    border: 'border-orange-200',
    hoverBorder: 'hover:border-orange-400',
  },
  cyan: {
    iconBg: 'bg-cyan-100',
    iconText: 'text-cyan-600',
    border: 'border-cyan-200',
    hoverBorder: 'hover:border-cyan-400',
  },
  pink: {
    iconBg: 'bg-pink-100',
    iconText: 'text-pink-600',
    border: 'border-pink-200',
    hoverBorder: 'hover:border-pink-400',
  },
};

export function FeatureCard({
  icon: Icon,
  title,
  description,
  preview,
  keyPoints,
  color,
}: FeatureCardProps) {
  const colors = colorClasses[color];

  return (
    <Card
      className={`p-6 hover:shadow-xl transition-all duration-300 border-2 ${colors.border} ${colors.hoverBorder}`}
    >
      {/* Icon with colored background */}
      <div className={`w-12 h-12 rounded-lg ${colors.iconBg} flex items-center justify-center mb-4`}>
        <Icon className={`w-6 h-6 ${colors.iconText}`} />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {title}
      </h3>

      {/* Visual Preview */}
      <div className="mb-4">
        {preview}
      </div>

      {/* Description */}
      <p className="text-gray-600 mb-4 leading-relaxed">
        {description}
      </p>

      {/* Key points */}
      <ul className="space-y-2 mb-4">
        {keyPoints.map((point, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <span>{point}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button variant="link" className="p-0 h-auto text-gray-700 hover:text-gray-900">
        Learn more <ArrowRight className="w-4 h-4 ml-1" />
      </Button>
    </Card>
  );
}
