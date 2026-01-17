/**
 * MiniTeamActivity Component
 * Team collaboration preview showing recent activity
 */

'use client';

import React from 'react';
import { Users, User } from 'lucide-react';

export function MiniTeamActivity() {
  const activities = [
    { user: 'Sarah K.', action: 'deployed api-service', time: '5m' },
    { user: 'Mike T.', action: 'updated security policy', time: '22m' },
    { user: 'Alex R.', action: 'optimized RDS costs', time: '1h' },
  ];

  return (
    <div className="bg-gradient-to-br from-pink-50 to-white rounded-lg p-4 border border-pink-200">
      {/* Activity feed */}
      <div className="space-y-3 mb-3">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-2">
            <div className="w-6 h-6 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
              <User className="w-3 h-3 text-pink-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">
                <span className="font-medium">{activity.user}</span>
                {' '}
                <span className="text-gray-600">{activity.action}</span>
              </p>
              <p className="text-xs text-gray-500">{activity.time} ago</p>
            </div>
          </div>
        ))}
      </div>

      {/* Team stats */}
      <div className="flex items-center justify-between pt-3 border-t border-pink-200">
        <div className="flex items-center gap-1 text-pink-600">
          <Users className="w-4 h-4" />
          <span className="text-sm font-semibold">8 team members</span>
        </div>
        <span className="text-xs text-gray-500">24 actions today</span>
      </div>
    </div>
  );
}
