'use client'

import { DollarSign, Shield, Activity, TrendingUp } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

/**
 * FeatureShowcase Component
 *
 * 2x2 grid of interactive feature cards with hover effects.
 * Each card highlights a key platform capability.
 */

const features = [
  {
    icon: DollarSign,
    title: 'Cost Optimization',
    description: 'Identify waste and reduce AWS spending automatically',
    stat: '$50K+ avg. savings/year',
    color: 'green' as const,
    gradient: 'from-green-500/10 to-emerald-500/10',
  },
  {
    icon: Shield,
    title: 'Security Monitoring',
    description: 'Real-time security posture and compliance tracking',
    stat: '99.9% threat detection',
    color: 'blue' as const,
    gradient: 'from-blue-500/10 to-cyan-500/10',
  },
  {
    icon: Activity,
    title: 'Service Health',
    description: 'Monitor all services and deployments in one place',
    stat: '500+ teams trust us',
    color: 'purple' as const,
    gradient: 'from-purple-500/10 to-pink-500/10',
  },
  {
    icon: TrendingUp,
    title: 'DORA Metrics',
    description: 'Automated engineering performance tracking',
    stat: 'Zero manual reporting',
    color: 'orange' as const,
    gradient: 'from-orange-500/10 to-red-500/10',
  },
]

const colorClasses = {
  green: 'text-green-600 bg-green-100',
  blue: 'text-blue-600 bg-blue-100',
  purple: 'text-purple-600 bg-purple-100',
  orange: 'text-orange-600 bg-orange-100',
}

export function FeatureShowcase() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything you need to manage AWS
          </h2>
          <p className="text-xl text-muted-foreground">
            Comprehensive platform engineering toolkit in one dashboard
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="group border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-[#635BFF]/50 cursor-pointer animate-in fade-in slide-in-from-bottom-4"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationDuration: '600ms',
                }}
              >
                <CardContent className="p-8">
                  {/* Icon with Background Pattern on Hover */}
                  <div className="relative mb-6">
                    <div
                      className={cn(
                        'inline-flex p-4 rounded-xl transition-transform duration-300 group-hover:scale-110',
                        colorClasses[feature.color]
                      )}
                    >
                      <Icon className="h-8 w-8" />
                    </div>
                    {/* Gradient overlay on hover */}
                    <div
                      className={cn(
                        'absolute inset-0 bg-gradient-to-br rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl',
                        feature.gradient
                      )}
                    />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <p className="text-lg font-semibold text-[#635BFF]">{feature.stat}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
