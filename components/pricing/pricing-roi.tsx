'use client';

import { TrendingDown, Clock, Shield, DollarSign, Zap, BarChart3 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const roiMetrics = [
  {
    icon: TrendingDown,
    metric: '$2,400',
    sublabel: '/month average',
    title: 'AWS Cost Savings',
    description: '12-18% reduction in cloud spend through optimization recommendations',
    gradient: 'from-green-500 to-emerald-600',
    bgGradient: 'from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30',
    iconBg: 'bg-green-100 dark:bg-green-900/50',
    iconColor: 'text-green-600 dark:text-green-400',
  },
  {
    icon: Clock,
    metric: '20 hours',
    sublabel: '/month saved',
    title: 'Time Saved',
    description: '3-minute setup vs hours of manual tracking and configuration',
    gradient: 'from-blue-500 to-indigo-600',
    bgGradient: 'from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30',
    iconBg: 'bg-blue-100 dark:bg-blue-900/50',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    icon: Shield,
    metric: '$15K',
    sublabel: 'average prevented',
    title: 'Risk Reduction',
    description: 'Prevent budget overruns with real-time alerts and 100% infrastructure visibility',
    gradient: 'from-purple-500 to-violet-600',
    bgGradient: 'from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30',
    iconBg: 'bg-purple-100 dark:bg-purple-900/50',
    iconColor: 'text-purple-600 dark:text-purple-400',
  },
];

const additionalBenefits = [
  {
    icon: DollarSign,
    title: 'Orphaned Resource Detection',
    value: '$800+',
    description: 'average monthly waste identified',
  },
  {
    icon: Zap,
    title: 'Right-sizing Recommendations',
    value: '25%',
    description: 'typical EC2 cost reduction',
  },
  {
    icon: BarChart3,
    title: 'Reserved Instance Opportunities',
    value: '40%',
    description: 'savings vs on-demand pricing',
  },
];

export function PricingROI() {
  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Why Teams Choose DevControl
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Real results from real customers. See how teams like yours save thousands each month.
        </p>
      </div>

      {/* Main ROI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {roiMetrics.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card
              key={index}
              className={`relative overflow-hidden border-2 hover:border-primary/30 transition-all duration-300 hover:shadow-lg bg-gradient-to-br ${item.bgGradient}`}
            >
              <CardContent className="p-6 lg:p-8">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${item.iconBg} flex items-center justify-center mb-6`}>
                  <Icon className={`w-6 h-6 ${item.iconColor}`} />
                </div>

                {/* Metric */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-4xl lg:text-5xl font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                      {item.metric}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">
                    {item.sublabel}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Benefits Bar */}
      <div className="bg-card border rounded-xl p-6 lg:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
          {additionalBenefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-xl font-bold text-foreground">{benefit.value}</span>
                    <span className="text-xs text-muted-foreground">{benefit.description}</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{benefit.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ROI Calculator Teaser */}
      <div className="text-center p-6 bg-muted/50 rounded-xl border border-dashed">
        <p className="text-sm text-muted-foreground mb-2">
          <span className="font-semibold text-foreground">Pro Plan Example:</span>{' '}
          Typical ROI: Save $2,400/mo vs $299 cost ={' '}
          <span className="font-bold text-green-600 dark:text-green-400">8x return</span>
        </p>
        <p className="text-xs text-muted-foreground">
          Based on average customer data. Your actual savings may vary based on infrastructure size.
        </p>
      </div>
    </div>
  );
}
