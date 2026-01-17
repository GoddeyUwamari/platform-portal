/**
 * MiniSecurityChecklist Component
 * Security posture preview showing compliance status
 */

'use client';

import React from 'react';
import { CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

export function MiniSecurityChecklist() {
  const checks = [
    { label: 'Encryption enabled', status: 'pass', detail: '42/42' },
    { label: 'MFA configured', status: 'pass', detail: '8/8' },
    { label: 'Public S3 buckets', status: 'warn', detail: '3 found' },
  ];

  return (
    <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg p-4 border border-purple-200">
      {/* Security checks */}
      <div className="space-y-3 mb-3">
        {checks.map((check, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1">
              {check.status === 'pass' ? (
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0" />
              )}
              <span className="text-sm text-gray-900">{check.label}</span>
            </div>
            <span className="text-xs text-gray-500">{check.detail}</span>
          </div>
        ))}
      </div>

      {/* Compliance score */}
      <div className="flex items-center justify-between pt-3 border-t border-purple-200">
        <div className="flex items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-purple-600" />
          <span className="text-sm font-semibold">
            <span className="text-green-600">95%</span>
            <span className="text-gray-600"> compliant</span>
          </span>
        </div>
        <span className="text-xs text-gray-500">2 issues</span>
      </div>
    </div>
  );
}
