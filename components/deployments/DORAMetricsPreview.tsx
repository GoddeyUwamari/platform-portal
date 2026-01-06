'use client'

import { Info, Lock, Star, TrendingUp, Clock, AlertCircle, RotateCcw } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import Link from 'next/link'

interface DORAMetric {
  id: string
  name: string
  description: string
  exampleValue: string
  tier: 'elite' | 'high' | 'medium' | 'low'
  percentile: number
  unlockRequirement: string
  icon: React.ReactNode
}

const metrics: DORAMetric[] = [
  {
    id: 'deployment-frequency',
    name: 'Deployment Frequency',
    description: 'How often your team successfully releases to production',
    exampleValue: '8.2 deploys/day',
    tier: 'elite',
    percentile: 85,
    unlockRequirement: 'Unlock after 10 deployments',
    icon: <TrendingUp className="h-5 w-5" />,
  },
  {
    id: 'lead-time',
    name: 'Lead Time for Changes',
    description: 'Time from code commit to running in production',
    exampleValue: '45 minutes',
    tier: 'elite',
    percentile: 92,
    unlockRequirement: 'Unlock after 10 deployments',
    icon: <Clock className="h-5 w-5" />,
  },
  {
    id: 'change-failure-rate',
    name: 'Change Failure Rate',
    description: 'Percentage of deployments causing failures in production',
    exampleValue: '4.2%',
    tier: 'elite',
    percentile: 88,
    unlockRequirement: 'Unlock after 20 deployments',
    icon: <AlertCircle className="h-5 w-5" />,
  },
  {
    id: 'mttr',
    name: 'Mean Time to Restore',
    description: 'How quickly you can recover from a production incident',
    exampleValue: '32 minutes',
    tier: 'high',
    percentile: 78,
    unlockRequirement: 'Unlock after first incident',
    icon: <RotateCcw className="h-5 w-5" />,
  },
]

function DORAMetricCard({ metric }: { metric: DORAMetric }) {
  const tierColors = {
    elite: 'bg-green-100 text-green-700 border-green-200',
    high: 'bg-blue-100 text-blue-700 border-blue-200',
    medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    low: 'bg-red-100 text-red-700 border-red-200',
  }

  const tierLabels = {
    elite: 'Elite Tier',
    high: 'High Tier',
    medium: 'Medium Tier',
    low: 'Low Tier',
  }

  return (
    <div className="border rounded-lg p-6 bg-white hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
            {metric.icon}
          </div>
          <h3 className="font-semibold text-gray-900">{metric.name}</h3>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p className="text-sm">{metric.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="space-y-4">
        {/* Example value */}
        <div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {metric.exampleValue}
          </div>
          <Badge className={`${tierColors[metric.tier]} border`}>
            {metric.tier === 'elite' && <Star className="h-3 w-3 mr-1 fill-current" />}
            {tierLabels[metric.tier]}
          </Badge>
        </div>

        {/* Percentile bar */}
        <div className="space-y-2">
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${
                metric.tier === 'elite'
                  ? 'bg-green-500'
                  : metric.tier === 'high'
                  ? 'bg-blue-500'
                  : metric.tier === 'medium'
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
              style={{ width: `${metric.percentile}%` }}
            />
          </div>
          <p className="text-xs text-gray-500">
            {metric.percentile}th percentile
          </p>
        </div>

        {/* Unlock requirement */}
        <div className="pt-3 border-t">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Lock className="h-4 w-4" />
            <span>{metric.unlockRequirement}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function DORAMetricsPreview() {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-600">
            Track the four key metrics that predict software delivery performance
          </p>
        </div>
        <Link
          href="https://cloud.google.com/blog/products/devops-sre/using-the-four-keys-to-measure-your-devops-performance"
          target="_blank"
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          What are DORA metrics?
          <Info className="h-3 w-3" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map((metric) => (
          <DORAMetricCard key={metric.id} metric={metric} />
        ))}
      </div>

      <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-900">
          <strong>Elite performers</strong> deploy <strong>200x more frequently</strong> and have{' '}
          <strong>3x lower</strong> change failure rates than low performers
        </p>
        <p className="text-xs text-blue-700 mt-2">
          Source: DORA State of DevOps Report
        </p>
      </div>
    </div>
  )
}
