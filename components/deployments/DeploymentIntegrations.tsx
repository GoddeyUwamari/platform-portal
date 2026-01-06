'use client'

import { GitBranch, GitlabIcon as GitLab, Code2, ExternalLink, CheckCircle2, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

interface IntegrationCardProps {
  title: string
  icon: React.ReactNode
  setupTime: string
  benefit: string
  isRecommended?: boolean
  isConnected?: boolean
  primaryAction: {
    label: string
    href?: string
    onClick?: () => void
  }
  secondaryAction?: {
    label: string
    href: string
  }
}

function IntegrationCard({
  title,
  icon,
  setupTime,
  benefit,
  isRecommended,
  isConnected,
  primaryAction,
  secondaryAction,
}: IntegrationCardProps) {
  return (
    <div className="relative border rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all bg-white">
      {isRecommended && (
        <Badge className="absolute -top-3 left-4 bg-blue-500 text-white border-blue-600">
          Recommended
        </Badge>
      )}

      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-gray-100">
          {icon}
        </div>

        <div className="flex-1 space-y-3">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-sm text-gray-600 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {setupTime}
              </span>
              {isConnected && (
                <Badge className="bg-green-100 text-green-700 border-green-200">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Connected
                </Badge>
              )}
              {!isConnected && (
                <Badge variant="outline" className="text-gray-600">
                  Not connected
                </Badge>
              )}
            </div>
          </div>

          <p className="text-sm text-gray-600">{benefit}</p>

          <div className="flex items-center gap-2 pt-2">
            {primaryAction.href ? (
              <Link href={primaryAction.href}>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  {primaryAction.label}
                </Button>
              </Link>
            ) : (
              <Button
                onClick={primaryAction.onClick}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {primaryAction.label}
              </Button>
            )}

            {secondaryAction && (
              <Link href={secondaryAction.href} target="_blank">
                <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
                  {secondaryAction.label}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function DeploymentIntegrations() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <IntegrationCard
        title="GitHub Actions"
        icon={<GitBranch className="h-6 w-6 text-gray-700" />}
        setupTime="2-minute setup"
        benefit="Auto-track every production push"
        isRecommended={true}
        isConnected={false}
        primaryAction={{
          label: 'Connect GitHub',
          href: '/settings/integrations',
        }}
        secondaryAction={{
          label: 'View Guide',
          href: 'https://docs.github.com/en/actions',
        }}
      />

      <IntegrationCard
        title="GitLab CI/CD"
        icon={<GitLab className="h-6 w-6 text-gray-700" />}
        setupTime="3-minute setup"
        benefit="Pipeline integration via webhook"
        isConnected={false}
        primaryAction={{
          label: 'Connect GitLab',
          href: '/settings/integrations',
        }}
        secondaryAction={{
          label: 'View Guide',
          href: 'https://docs.gitlab.com/ee/ci/',
        }}
      />

      <IntegrationCard
        title="REST API"
        icon={<Code2 className="h-6 w-6 text-gray-700" />}
        setupTime="Most flexible"
        benefit="Use our deployment API endpoint"
        isConnected={false}
        primaryAction={{
          label: 'View API Docs',
          href: '#api-example',
          onClick: () => {
            document.getElementById('api-example')?.scrollIntoView({ behavior: 'smooth' })
          },
        }}
        secondaryAction={{
          label: 'cURL Example',
          href: '#api-example',
        }}
      />
    </div>
  )
}
