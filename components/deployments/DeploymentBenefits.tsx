'use client'

import { TrendingUp, AlertTriangle, BarChart3 } from 'lucide-react'

interface Benefit {
  id: string
  icon: React.ReactNode
  iconColor: string
  title: string
  outcomes: string[]
  example: string
}

const benefits: Benefit[] = [
  {
    id: 'measure',
    icon: <TrendingUp className="h-6 w-6" />,
    iconColor: 'bg-blue-100 text-blue-600',
    title: 'Measure Team Performance',
    outcomes: [
      'Track every deploy automatically',
      'Compare against industry benchmarks',
      'Elite teams deploy 200x more frequently',
    ],
    example:
      'Our deploy frequency went from 2/week to 12/day after tracking',
  },
  {
    id: 'identify',
    icon: <AlertTriangle className="h-6 w-6" />,
    iconColor: 'bg-green-100 text-green-600',
    title: 'Identify Bottlenecks',
    outcomes: [
      'See exactly where delays happen',
      'Spot deployment patterns and issues',
      'Reduce lead time by 60% on average',
    ],
    example:
      'Discovered our review process added 3 days to every deploy',
  },
  {
    id: 'roi',
    icon: <BarChart3 className="h-6 w-6" />,
    iconColor: 'bg-purple-100 text-purple-600',
    title: 'Prove ROI to Leadership',
    outcomes: [
      'Show velocity improvements over time',
      'Demonstrate engineering efficiency',
      'Link deployments to business outcomes',
    ],
    example:
      'Used DORA metrics to justify our CI/CD investment',
  },
]

function BenefitCard({ benefit }: { benefit: Benefit }) {
  return (
    <div className="border rounded-lg p-6 bg-white hover:shadow-md transition-shadow">
      {/* Icon */}
      <div className={`w-12 h-12 rounded-lg ${benefit.iconColor} flex items-center justify-center mb-4`}>
        {benefit.icon}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-3">
        {benefit.title}
      </h3>

      {/* Outcomes */}
      <ul className="space-y-2 mb-4">
        {benefit.outcomes.map((outcome, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
            <span className="text-blue-600 mt-1">•</span>
            <span>{outcome}</span>
          </li>
        ))}
      </ul>

      {/* Example */}
      <div className="pt-4 border-t border-gray-100">
        <p className="text-sm italic text-gray-500">
          "{benefit.example}"
        </p>
      </div>
    </div>
  )
}

export function DeploymentBenefits() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Why Track Deployments?
        </h2>
        <p className="text-gray-600">
          Turn deployment data into actionable insights for your engineering team
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {benefits.map((benefit) => (
          <BenefitCard key={benefit.id} benefit={benefit} />
        ))}
      </div>
    </div>
  )
}
