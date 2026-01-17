/**
 * PlatformPreview Component
 * Feature-focused showcase with real visual examples
 */

'use client';

import React from 'react';
import { DollarSign, Activity, Shield, TrendingUp, Search, Users, Sparkles } from 'lucide-react';
import { FeatureCard } from './FeatureCard';
import { MiniCostChart } from './MiniCostChart';
import { MiniDeploymentTimeline } from './MiniDeploymentTimeline';
import { MiniSecurityChecklist } from './MiniSecurityChecklist';
import { MiniPerformanceMetrics } from './MiniPerformanceMetrics';
import { MiniResourceGrid } from './MiniResourceGrid';
import { MiniTeamActivity } from './MiniTeamActivity';

export function PlatformPreview() {
  const features = [
    {
      icon: DollarSign,
      title: 'Cost Optimization',
      description: 'Real-time cost tracking across all AWS services with AI-powered savings recommendations. Average 15% cost reduction.',
      preview: <MiniCostChart />,
      keyPoints: [
        'Real-time spending alerts',
        'Automated optimization tips',
        'Cost forecasting & budgets',
      ],
      color: 'green' as const,
    },
    {
      icon: Activity,
      title: 'Live Deployments',
      description: 'Monitor all deployments with DORA metrics automatically tracked. Know exactly when, what, and who deployed across your infrastructure.',
      preview: <MiniDeploymentTimeline />,
      keyPoints: [
        'Real-time deployment tracking',
        'DORA metrics dashboard',
        'Automated rollback on failure',
      ],
      color: 'blue' as const,
    },
    {
      icon: Shield,
      title: 'Security Posture',
      description: 'Automated compliance checks and vulnerability detection. Identify public resources, missing encryption, and security risks instantly.',
      preview: <MiniSecurityChecklist />,
      keyPoints: [
        'Compliance monitoring',
        'Vulnerability scanning',
        'Security best practices',
      ],
      color: 'purple' as const,
    },
    {
      icon: TrendingUp,
      title: 'Performance Insights',
      description: 'Engineering velocity and efficiency metrics at your fingertips. Track service health, response times, and team productivity.',
      preview: <MiniPerformanceMetrics />,
      keyPoints: [
        'DORA velocity metrics',
        'Service health monitoring',
        'Performance benchmarking',
      ],
      color: 'orange' as const,
    },
    {
      icon: Search,
      title: 'Resource Discovery',
      description: 'Complete visibility into your AWS infrastructure. Discover, tag, and manage all resources across multiple regions and accounts.',
      preview: <MiniResourceGrid />,
      keyPoints: [
        'Multi-region discovery',
        'Automated tagging',
        'Resource optimization',
      ],
      color: 'cyan' as const,
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Unified dashboard for your entire engineering team. Role-based access, shared insights, and collaborative workflows.',
      preview: <MiniTeamActivity />,
      keyPoints: [
        'Role-based access control',
        'Shared team dashboards',
        'Activity tracking & audit logs',
      ],
      color: 'pink' as const,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-600">Platform Overview</span>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Everything You Need in One Platform
          </h2>

          {/* Description */}
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive view of your AWS infrastructure with real-time insights,
            cost optimization, security monitoring, and deployment tracking — all in
            an intuitive dashboard
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              preview={feature.preview}
              keyPoints={feature.keyPoints}
              color={feature.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
