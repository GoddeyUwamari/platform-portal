'use client'

import { CheckCircle2, Circle, ArrowRight, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'

interface ChecklistStep {
  id: string
  number: number
  title: string
  timeEstimate: string
  isCompleted: boolean
  isCurrent: boolean
  action: {
    label: string
    href?: string
    onClick?: () => void
  }
}

const steps: ChecklistStep[] = [
  {
    id: 'create-service',
    number: 1,
    title: 'Create your first service',
    timeEstimate: '2 min',
    isCompleted: false,
    isCurrent: true,
    action: {
      label: 'Go to Services',
      href: '/services',
    },
  },
  {
    id: 'connect-github',
    number: 2,
    title: 'Connect GitHub Actions',
    timeEstimate: '2 min',
    isCompleted: false,
    isCurrent: false,
    action: {
      label: 'Connect Now',
      href: '/settings/integrations',
    },
  },
  {
    id: 'deploy',
    number: 3,
    title: 'Deploy to production',
    timeEstimate: '5 min',
    isCompleted: false,
    isCurrent: false,
    action: {
      label: 'View Deploy Guide',
      href: 'https://docs.example.com/deploy',
    },
  },
  {
    id: 'view-metrics',
    number: 4,
    title: 'View DORA metrics',
    timeEstimate: 'instant',
    isCompleted: false,
    isCurrent: false,
    action: {
      label: 'Auto-unlock after step 3',
      href: '#',
    },
  },
]

function ChecklistItem({ step }: { step: ChecklistStep }) {
  const isDisabled = !step.isCompleted && !step.isCurrent

  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
        step.isCompleted
          ? 'bg-green-50 border-green-200'
          : step.isCurrent
          ? 'bg-blue-50 border-blue-300 shadow-sm'
          : 'bg-gray-50 border-gray-200 opacity-60'
      }`}
    >
      {/* Checkbox */}
      <div className="flex-shrink-0">
        {step.isCompleted ? (
          <CheckCircle2 className="h-6 w-6 text-green-600" />
        ) : (
          <Circle
            className={`h-6 w-6 ${
              step.isCurrent ? 'text-blue-600' : 'text-gray-400'
            }`}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span
            className={`text-sm font-medium ${
              step.isCompleted
                ? 'text-green-900'
                : step.isCurrent
                ? 'text-blue-900'
                : 'text-gray-600'
            }`}
          >
            {step.number}. {step.title}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Clock className="h-3 w-3" />
          <span>{step.timeEstimate}</span>
        </div>
      </div>

      {/* Action */}
      <div className="flex-shrink-0">
        {step.action.href && step.action.href !== '#' ? (
          <Link href={step.action.href}>
            <Button
              size="sm"
              variant={step.isCurrent ? 'default' : 'ghost'}
              disabled={isDisabled}
              className={step.isCurrent ? 'bg-blue-600 hover:bg-blue-700' : ''}
            >
              {step.action.label}
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </Link>
        ) : (
          <Button
            size="sm"
            variant="ghost"
            disabled={true}
            className="text-gray-500"
          >
            {step.action.label}
          </Button>
        )}
      </div>
    </div>
  )
}

export function DeploymentSetupChecklist() {
  const completedSteps = steps.filter((s) => s.isCompleted).length
  const totalSteps = steps.length
  const progressPercentage = (completedSteps / totalSteps) * 100

  return (
    <div className="border rounded-lg p-6 bg-white">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-semibold">Get Started in 4 Steps</h3>
            <span className="text-sm text-gray-600">
              {completedSteps}/{totalSteps} complete
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Steps */}
        <div className="space-y-3">
          {steps.map((step) => (
            <ChecklistItem key={step.id} step={step} />
          ))}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t">
          <p className="text-sm text-gray-600">
            Complete these steps to unlock deployment tracking and DORA metrics
          </p>
        </div>
      </div>
    </div>
  )
}
