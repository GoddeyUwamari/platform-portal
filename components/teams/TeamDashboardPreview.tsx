'use client'

import { TrendingUp, DollarSign, Rocket, Users } from 'lucide-react';

export function TeamDashboardPreview() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          👀 Preview: Team Dashboard
        </h3>
        <p className="text-gray-600">
          This is what you&apos;ll see for each team
        </p>
      </div>

      {/* Mock Team Dashboard */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200 p-6">
        {/* Team Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
              FE
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-900">Frontend Team</h4>
              <p className="text-sm text-gray-600">8 members • 12 services</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              Active
            </span>
          </div>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 text-center">
            <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">8</div>
            <div className="text-xs text-gray-600">Team Members</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <Rocket className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">12</div>
            <div className="text-xs text-gray-600">Services</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <TrendingUp className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">47</div>
            <div className="text-xs text-gray-600">Deploys/Week</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <DollarSign className="w-6 h-6 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">$847</div>
            <div className="text-xs text-gray-600">Monthly Cost</div>
          </div>
        </div>

        {/* Services List Preview */}
        <div className="bg-white rounded-lg p-4">
          <h5 className="text-sm font-semibold text-gray-900 mb-3">
            Owned Services
          </h5>
          <div className="space-y-2">
            {['web-app', 'mobile-app', 'design-system'].map((service) => (
              <div key={service} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">{service}</span>
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">
                    Healthy
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  23 deploys this month
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-center text-sm text-gray-500 italic">
        Example team dashboard - create a team to see your actual data
      </p>
    </div>
  );
}
