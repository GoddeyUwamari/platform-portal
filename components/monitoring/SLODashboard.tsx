'use client'

import { cn } from '@/lib/utils'

interface SLO {
  name: string
  current: number
  target: number
  errorBudget: number
  description?: string
}

interface SLODashboardProps {
  slos: SLO[]
}

export function SLODashboard({ slos }: SLODashboardProps) {
  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">SLO Compliance</h3>
        <p className="text-sm text-gray-600">Service Level Objectives (30 days)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {slos.map((slo) => (
          <div key={slo.name} className="border rounded-lg p-4">
            {/* SLO Name */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-sm font-semibold">{slo.name}</h4>
                {slo.description && (
                  <p className="text-xs text-gray-500 mt-0.5">
                    {slo.description}
                  </p>
                )}
              </div>
              <span
                className={cn(
                  "px-2 py-1 text-xs rounded-full font-medium",
                  slo.current >= slo.target
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                )}
              >
                {slo.current >= slo.target ? 'Met' : 'At Risk'}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-gray-600">Current</span>
                <span className="font-semibold">{slo.current.toFixed(2)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={cn(
                    "h-2 rounded-full transition-all",
                    slo.current >= slo.target ? "bg-green-500" : "bg-red-500"
                  )}
                  style={{ width: `${Math.min(slo.current, 100)}%` }}
                />
              </div>
            </div>

            {/* Target & Error Budget */}
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>Target: {slo.target}%</span>
              <span
                className={cn(
                  "font-medium",
                  slo.errorBudget > 0 ? "text-green-600" : "text-red-600"
                )}
              >
                Budget: {slo.errorBudget.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
