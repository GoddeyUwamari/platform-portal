'use client';

import { useState, useEffect, useCallback } from 'react';
import { WifiOff, Wifi, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface OfflineDetectorProps {
  onOnline?: () => void;
  onOffline?: () => void;
  className?: string;
}

export function OfflineDetector({
  onOnline,
  onOffline,
  className,
}: OfflineDetectorProps) {
  const [isOnline, setIsOnline] = useState(true);
  const [showBanner, setShowBanner] = useState(false);
  const [showReconnected, setShowReconnected] = useState(false);

  useEffect(() => {
    // Set initial state
    setIsOnline(navigator.onLine);
    if (!navigator.onLine) {
      setShowBanner(true);
    }

    const handleOnline = () => {
      setIsOnline(true);
      setShowBanner(true);
      setShowReconnected(true);
      onOnline?.();

      // Hide "back online" message after 3 seconds
      setTimeout(() => {
        setShowBanner(false);
        setShowReconnected(false);
      }, 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowBanner(true);
      setShowReconnected(false);
      onOffline?.();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [onOnline, onOffline]);

  // Don't render if online and no banner to show
  if (isOnline && !showBanner) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 z-[100] transition-all duration-300',
        showBanner ? 'translate-y-0' : '-translate-y-full',
        className
      )}
      role="alert"
      aria-live="assertive"
    >
      <div
        className={cn(
          'px-4 py-3 text-center text-sm font-medium shadow-lg',
          isOnline
            ? 'bg-green-600 text-white'
            : 'bg-orange-600 text-white'
        )}
      >
        {isOnline ? (
          <div className="flex items-center justify-center gap-2">
            <Wifi className="w-4 h-4" aria-hidden="true" />
            <span>You&apos;re back online!</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <WifiOff className="w-4 h-4" aria-hidden="true" />
            <span>No internet connection. Some features may be unavailable.</span>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Hook for checking online status
 */
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

/**
 * Cached data indicator shown when displaying stale data
 */
interface CachedDataIndicatorProps {
  lastSyncedAt: Date | string;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  className?: string;
}

export function CachedDataIndicator({
  lastSyncedAt,
  onRefresh,
  isRefreshing = false,
  className,
}: CachedDataIndicatorProps) {
  const formatTimeAgo = useCallback((date: Date | string) => {
    const now = new Date();
    const then = new Date(date);
    const diffMs = now.getTime() - then.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'just now';
    if (diffMins === 1) return '1 minute ago';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours === 1) return '1 hour ago';
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays === 1) return 'yesterday';
    return `${diffDays} days ago`;
  }, []);

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4 px-4 py-3 rounded-lg',
        'bg-amber-50 dark:bg-amber-900/20',
        'border border-amber-200 dark:border-amber-800',
        className
      )}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3">
        <div className="p-1.5 rounded-full bg-amber-100 dark:bg-amber-800/50">
          <WifiOff className="w-4 h-4 text-amber-600 dark:text-amber-400" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
            Showing cached data
          </p>
          <p className="text-xs text-amber-600 dark:text-amber-300">
            Last synced {formatTimeAgo(lastSyncedAt)}
          </p>
        </div>
      </div>

      {onRefresh && (
        <Button
          onClick={onRefresh}
          disabled={isRefreshing}
          size="sm"
          variant="outline"
          className="text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-800/50"
        >
          {isRefreshing ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" aria-hidden="true" />
              Syncing...
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4 mr-2" aria-hidden="true" />
              Refresh
            </>
          )}
        </Button>
      )}
    </div>
  );
}
