'use client'

import { Breadcrumb } from '@/components/navigation/breadcrumb'
import { EmptyState } from '@/components/onboarding/empty-state'

export default function TeamsPage() {
  return (
    <div className="space-y-6 px-4 md:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Teams' }
        ]}
      />

      <div>
        <h1 className="text-3xl font-bold tracking-tight">Teams</h1>
        <p className="text-muted-foreground mt-2">
          Manage teams and their service ownership
        </p>
      </div>

      <EmptyState
        icon="👥"
        headline="Organize services by team — and see who owns what"
        description="Create teams to establish clear ownership, track performance metrics, and attribute AWS costs to the right groups. Get full accountability across your entire platform."
        tip="Most teams start by mapping their org chart — frontend, backend, platform, data, etc."
        primaryCTA={{
          label: 'Create Team',
          action: 'route',
          route: '/teams/new',
        }}
        secondaryCTA={{
          label: 'Learn About Teams',
          action: 'external',
          href: 'https://docs.example.com/teams',
        }}
        onboardingStep="create_team"
      />
    </div>
  )
}