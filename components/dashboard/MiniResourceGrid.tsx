/**
 * MiniResourceGrid Component
 * Resource discovery preview showing AWS resources
 */

'use client';

import React from 'react';
import { Database, Server, HardDrive, Globe } from 'lucide-react';

export function MiniResourceGrid() {
  const resources = [
    { icon: Server, label: 'EC2', count: 42, color: 'text-orange-600' },
    { icon: Database, label: 'RDS', count: 8, color: 'text-blue-600' },
    { icon: HardDrive, label: 'S3', count: 156, color: 'text-green-600' },
    { icon: Globe, label: 'ELB', count: 12, color: 'text-purple-600' },
  ];

  return (
    <div className="bg-gradient-to-br from-cyan-50 to-white rounded-lg p-4 border border-cyan-200">
      {/* Resource grid */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        {resources.map((resource, index) => {
          const Icon = resource.icon;
          return (
            <div key={index} className="bg-white rounded-lg p-3 border border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <Icon className={`w-4 h-4 ${resource.color}`} />
                <span className="text-xs text-gray-600 font-medium">{resource.label}</span>
              </div>
              <p className="text-xl font-bold text-gray-900">{resource.count}</p>
            </div>
          );
        })}
      </div>

      {/* Total count */}
      <div className="flex items-center justify-between pt-3 border-t border-cyan-200">
        <span className="text-sm font-semibold text-cyan-600">218 resources</span>
        <span className="text-xs text-gray-500">3 regions</span>
      </div>
    </div>
  );
}
