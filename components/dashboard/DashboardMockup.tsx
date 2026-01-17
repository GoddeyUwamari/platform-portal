/**
 * DashboardMockup Component
 * Realistic dashboard preview with 3D perspective
 * Used in the hero section to showcase the actual DevControl interface
 */

'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Server, DollarSign, Activity, Shield } from 'lucide-react';

export function DashboardMockup() {
  return (
    <div className="relative">
      {/* Glow effect behind the mockup */}
      <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl opacity-20 blur-3xl" />

      {/* Main mockup container with 3D perspective */}
      <div
        className="relative transform transition-transform duration-500 hover:scale-105"
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d'
        }}
      >
        <div
          className="relative bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden"
          style={{
            transform: 'rotateY(-5deg) rotateX(2deg)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }}
        >
          {/* Browser chrome */}
          <div className="bg-gray-100 border-b border-gray-200 px-4 py-2.5 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-500 ml-2">
              devcontrol.app/dashboard
            </div>
          </div>

          {/* Dashboard content */}
          <div className="p-4 bg-gradient-to-br from-gray-50 to-white">
            {/* Header */}
            <div className="mb-4">
              <div className="h-3 w-24 bg-gray-900 rounded mb-1" />
              <div className="h-2 w-40 bg-gray-400 rounded" />
            </div>

            {/* Metric cards grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {/* Card 1 - Active Services */}
              <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs text-gray-600 font-medium">Active Services</div>
                  <div className="h-6 w-6 rounded bg-blue-100 flex items-center justify-center">
                    <Server className="h-3 w-3 text-blue-600" />
                  </div>
                </div>
                <div className="text-xl font-bold text-gray-900 mb-1">23</div>
                <div className="flex items-center text-xs">
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-green-600 font-medium">+2</span>
                  <span className="text-gray-500 ml-1">this week</span>
                </div>
              </div>

              {/* Card 2 - AWS Spend */}
              <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs text-gray-600 font-medium">AWS Spend</div>
                  <div className="h-6 w-6 rounded bg-green-100 flex items-center justify-center">
                    <DollarSign className="h-3 w-3 text-green-600" />
                  </div>
                </div>
                <div className="text-xl font-bold text-gray-900 mb-1">$1,247</div>
                <div className="flex items-center text-xs">
                  <TrendingDown className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-green-600 font-medium">-15%</span>
                  <span className="text-gray-500 ml-1">vs last mo</span>
                </div>
              </div>

              {/* Card 3 - Resources */}
              <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs text-gray-600 font-medium">Resources</div>
                  <div className="h-6 w-6 rounded bg-purple-100 flex items-center justify-center">
                    <Activity className="h-3 w-3 text-purple-600" />
                  </div>
                </div>
                <div className="text-xl font-bold text-gray-900 mb-1">156</div>
                <div className="flex items-center text-xs">
                  <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                  <span className="text-green-600 font-medium">+8</span>
                  <span className="text-gray-500 ml-1">total</span>
                </div>
              </div>

              {/* Card 4 - Issues */}
              <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-xs text-gray-600 font-medium">Issues</div>
                  <div className="h-6 w-6 rounded bg-orange-100 flex items-center justify-center">
                    <Shield className="h-3 w-3 text-orange-600" />
                  </div>
                </div>
                <div className="text-xl font-bold text-gray-900 mb-1">3</div>
                <div className="flex items-center text-xs">
                  <span className="px-1.5 py-0.5 rounded bg-green-100 text-green-700 text-xs font-medium">Low</span>
                </div>
              </div>
            </div>

            {/* Chart preview */}
            <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className="h-2 w-28 bg-gray-900 rounded" />
                <div className="h-2 w-16 bg-gray-300 rounded" />
              </div>
              {/* Mini chart */}
              <div className="h-24 relative">
                <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-blue-100 via-blue-50 to-transparent rounded" />
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-1 h-full px-1">
                  {[40, 55, 45, 70, 60, 80, 75, 90, 85, 95].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-blue-500 rounded-t opacity-80"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Recent activity list */}
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-gray-700">EC2 instance i-abc123 deployed</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-gray-700">RDS backup completed</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <span className="text-gray-700">S3 bucket optimized (-$45/mo)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
