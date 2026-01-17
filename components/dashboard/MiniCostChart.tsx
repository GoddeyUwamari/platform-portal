/**
 * MiniCostChart Component
 * Cost optimization preview showing savings trend
 */

'use client';

import React from 'react';
import { TrendingDown } from 'lucide-react';

export function MiniCostChart() {
  const monthlyData = [
    { month: 'Jan', amount: 1450, label: '$1,450' },
    { month: 'Feb', amount: 1320, label: '$1,320' },
    { month: 'Mar', amount: 1180, label: '$1,180' },
    { month: 'Apr', amount: 1050, label: '$1,050' },
  ];

  const maxAmount = Math.max(...monthlyData.map((d) => d.amount));

  return (
    <div className="bg-gradient-to-br from-green-50 to-white rounded-lg p-4 border border-green-200">
      {/* Mini bar chart */}
      <div className="h-32 flex items-end justify-between gap-2 mb-3">
        {monthlyData.map((data, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-1">
            <div
              className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t transition-all hover:from-green-600 hover:to-green-500"
              style={{ height: `${(data.amount / maxAmount) * 100}%` }}
            />
            <span className="text-xs text-gray-600 font-medium">{data.month}</span>
          </div>
        ))}
      </div>

      {/* Savings indicator */}
      <div className="flex items-center justify-between pt-3 border-t border-green-200">
        <div className="flex items-center gap-1 text-green-600">
          <TrendingDown className="w-4 h-4" />
          <span className="text-sm font-semibold">$400/mo saved</span>
        </div>
        <span className="text-xs text-gray-500">-27% total</span>
      </div>
    </div>
  );
}
