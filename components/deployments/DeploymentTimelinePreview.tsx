'use client'

import { CheckCircle2, XCircle, Clock, GitCommit, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface TimelineEntry {
  id: string
  timestamp: string
  service: string
  environment: 'production' | 'staging' | 'development'
  deployedBy: {
    name: string
    avatar: string
  }
  status: 'success' | 'failed' | 'in-progress'
  duration: string
  commit: {
    hash: string
    message: string
  }
}

const exampleDeployments: TimelineEntry[] = [
  {
    id: '1',
    timestamp: '2 hours ago',
    service: 'payment-api',
    environment: 'production',
    deployedBy: {
      name: 'Sarah Chen',
      avatar: 'SC',
    },
    status: 'success',
    duration: '4m 23s',
    commit: {
      hash: 'abc1234',
      message: 'Fix payment timeout issue',
    },
  },
  {
    id: '2',
    timestamp: '5 hours ago',
    service: 'user-service',
    environment: 'staging',
    deployedBy: {
      name: 'Mike Johnson',
      avatar: 'MJ',
    },
    status: 'success',
    duration: '2m 15s',
    commit: {
      hash: 'def5678',
      message: 'Add user profile validation',
    },
  },
  {
    id: '3',
    timestamp: '1 day ago',
    service: 'notification-service',
    environment: 'production',
    deployedBy: {
      name: 'Alex Rivera',
      avatar: 'AR',
    },
    status: 'failed',
    duration: '1m 42s',
    commit: {
      hash: 'ghi9012',
      message: 'Update email templates',
    },
  },
]

function TimelineItem({ entry }: { entry: TimelineEntry }) {
  const statusIcons = {
    success: <CheckCircle2 className="h-4 w-4 text-green-600" />,
    failed: <XCircle className="h-4 w-4 text-red-600" />,
    'in-progress': <Clock className="h-4 w-4 text-blue-600 animate-spin" />,
  }

  const statusDots = {
    success: 'bg-green-500',
    failed: 'bg-red-500',
    'in-progress': 'bg-blue-500',
  }

  const environmentBadges = {
    production: 'bg-green-100 text-green-700 border-green-200',
    staging: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    development: 'bg-blue-100 text-blue-700 border-blue-200',
  }

  return (
    <div className="relative flex gap-4 pb-8 last:pb-0">
      {/* Timeline connector */}
      <div className="flex flex-col items-center">
        <div className={`w-3 h-3 rounded-full ${statusDots[entry.status]} ring-4 ring-gray-50`} />
        <div className="w-0.5 h-full bg-gray-200 mt-2" />
      </div>

      {/* Content */}
      <div className="flex-1 border rounded-lg p-4 bg-gray-50/50 hover:bg-gray-100/50 transition-colors">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">{entry.timestamp}</span>
            {statusIcons[entry.status]}
          </div>
          <Badge className={`${environmentBadges[entry.environment]} border text-xs`}>
            {entry.environment}
          </Badge>
        </div>

        <div className="space-y-2">
          <h4 className="font-semibold text-gray-900">{entry.service}</h4>

          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>{entry.deployedBy.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{entry.duration}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <GitCommit className="h-3 w-3 text-gray-400" />
            <code className="font-mono text-xs bg-white px-2 py-1 rounded border">
              {entry.commit.hash}
            </code>
            <span className="text-gray-600">{entry.commit.message}</span>
          </div>
        </div>

        <Button variant="ghost" size="sm" className="mt-3 text-gray-400" disabled>
          View Details →
        </Button>
      </div>
    </div>
  )
}

export function DeploymentTimelinePreview() {
  return (
    <div className="relative">
      {/* Example annotation */}
      <div className="absolute -top-8 right-0 text-sm text-gray-500 italic">
        Example: What your deployment feed will show
      </div>

      <div className="border rounded-lg p-6 bg-white opacity-75">
        <div className="space-y-0">
          {exampleDeployments.map((entry) => (
            <TimelineItem key={entry.id} entry={entry} />
          ))}
        </div>

        <div className="text-center pt-4 border-t">
          <p className="text-sm text-gray-500">
            Connect your first deployment to start tracking
          </p>
        </div>
      </div>
    </div>
  )
}
