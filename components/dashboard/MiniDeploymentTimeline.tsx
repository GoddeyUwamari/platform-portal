/**
 * MiniDeploymentTimeline Component
 * Recent deployment activity preview
 */

'use client';

import React from 'react';
import { CheckCircle2, GitBranch } from 'lucide-react';

export function MiniDeploymentTimeline() {
  const deployments = [
    { service: 'api-service v2.1.0', time: '2m ago', status: 'success' },
    { service: 'frontend updated', time: '15m ago', status: 'success' },
    { service: 'database migration', time: '1h ago', status: 'success' },
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-4 border border-blue-200">
      {/* Deployment list */}
      <div className="space-y-3 mb-3">
        {deployments.map((deployment, index) => (
          <div key={index} className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900 font-medium truncate">
                {deployment.service}
              </p>
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap">
              {deployment.time}
            </span>
          </div>
        ))}
      </div>

      {/* Success rate */}
      <div className="flex items-center justify-between pt-3 border-t border-blue-200">
        <div className="flex items-center gap-1 text-blue-600">
          <GitBranch className="w-4 h-4" />
          <span className="text-sm font-semibold">3 successful today</span>
        </div>
        <span className="text-xs text-gray-500">100% success</span>
      </div>
    </div>
  );
}
