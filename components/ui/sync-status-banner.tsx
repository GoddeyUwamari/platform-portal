'use client';

import { AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';
import { LastSynced } from './last-synced';

interface SyncStatusBannerProps {
  lastSynced: Date | string;
  status: 'syncing' | 'synced' | 'error';
  message?: string;
  onRetry?: () => void;
}

export function SyncStatusBanner({
  lastSynced,
  status,
  message,
  onRetry,
}: SyncStatusBannerProps) {
  if (status === 'synced') {
    return (
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-sm text-green-700 dark:text-green-300">
              All systems operational
            </span>
          </div>
          <LastSynced
            timestamp={lastSynced}
            showIcon={false}
            size="sm"
          />
        </div>
      </div>
    );
  }

  if (status === 'syncing') {
    return (
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-6">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-blue-600 dark:text-blue-400 animate-spin" />
          <span className="text-sm text-blue-700 dark:text-blue-300">
            Syncing data...
          </span>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
            <span className="text-sm text-red-700 dark:text-red-300">
              {message || 'Failed to sync data'}
            </span>
          </div>
          {onRetry && (
            <button
              onClick={onRetry}
              className="text-sm text-red-600 dark:text-red-400 hover:underline"
            >
              Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  return null;
}
