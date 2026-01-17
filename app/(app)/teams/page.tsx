'use client'

import { Users } from 'lucide-react'
import { TeamTemplates } from '@/components/teams/TeamTemplates'
import { TeamDashboardPreview } from '@/components/teams/TeamDashboardPreview'
import { TeamBenefits } from '@/components/teams/TeamBenefits'
import { TeamUseCases } from '@/components/teams/TeamUseCases'

export default function TeamsPage() {
  // TODO: Replace with actual data fetch when teams API is ready
  const teams: any[] = []
  const hasTeams = teams && teams.length > 0

  return (
    <div className="space-y-6 px-4 md:px-6 lg:px-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Teams</h1>
          <p className="text-muted-foreground mt-2">
            Manage teams and their service ownership
          </p>
        </div>
        {hasTeams && (
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            + Create Team
          </button>
        )}
      </div>

      {!hasTeams ? (
        <div className="space-y-10">
          {/* Enhanced Hero Section */}
          <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-lg border border-blue-200 p-8 text-center">
            {/* Icon */}
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-12 h-12 text-blue-600" />
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Organize Services by Team
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-600 mb-2 max-w-2xl mx-auto">
              Establish clear ownership, track performance metrics, and attribute
              AWS costs to the right groups.
            </p>

            <p className="text-sm text-gray-500 mb-8 max-w-xl mx-auto">
              Get full accountability across your entire platform with team-based organization.
            </p>

            {/* CTAs */}
            <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
              <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium text-lg hover:bg-blue-700 transition-colors">
                Create Your First Team →
              </button>
              <button className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-medium text-lg hover:bg-gray-50 transition-colors">
                View Team Templates
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600 flex-wrap">
              <span className="flex items-center gap-1.5">
                <span className="text-green-500">✓</span>
                <span>30-second setup</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-green-500">✓</span>
                <span>Track unlimited teams</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-green-500">✓</span>
                <span>Free on all plans</span>
              </span>
            </div>
          </div>

          {/* Team Templates */}
          <TeamTemplates />

          {/* Dashboard Preview */}
          <TeamDashboardPreview />

          {/* Benefits */}
          <TeamBenefits />

          {/* Use Cases */}
          <TeamUseCases />

          {/* Tip Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">💡</span>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Pro Tip: Most teams start by mapping their org chart
                </p>
                <p className="text-sm text-gray-600">
                  Frontend, backend, platform, data, etc.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Footer */}
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-8 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Ready to organize your services?
            </h3>
            <p className="text-gray-600 mb-6">
              Create your first team in 30 seconds
            </p>
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Create First Team →
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Teams List - Will be shown when teams exist */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
            <p className="text-gray-600">Your teams will be displayed here.</p>
          </div>
        </>
      )}
    </div>
  )
}