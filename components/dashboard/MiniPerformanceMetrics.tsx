/**
 * MiniPerformanceMetrics Component
 * Performance insights preview showing velocity metrics
 */

'use client';

import React from 'react';
import { TrendingUp, Zap } from 'lucide-react';

export function MiniPerformanceMetrics() {
  const metrics = [
    { label: 'Deploy Frequency', value: '12/day', trend: '+25%' },
    { label: 'Lead Time', value: '2.3h', trend: '-40%' },
    { label: 'MTTR', value: '18min', trend: '-35%' },
  ];

  return (
    <div className="bg-gradient-to-br from-orange-50 to-white rounded-lg p-4 border border-orange-200">
      {/* Metrics grid */}
      <div className="space-y-3 mb-3">
        {metrics.map((metric, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs text-gray-600 mb-1">{metric.label}</p>
              <p className="text-lg font-bold text-gray-900">{metric.value}</p>
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp className="w-3 h-3" />
              <span className="text-xs font-semibold">{metric.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Performance score */}
      <div className="flex items-center justify-between pt-3 border-t border-orange-200">
        <div className="flex items-center gap-1 text-orange-600">
          <Zap className="w-4 h-4" />
          <span className="text-sm font-semibold">Elite tier</span>
        </div>
        <span className="text-xs text-gray-500">DORA metrics</span>
      </div>
    </div>
  );
}
