'use client';

import { CheckCircle, XCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SyncHealthStatusProps {
  status: 'healthy' | 'warning' | 'error';
  message?: string;
  onResolve?: () => void;
  className?: string;
}

export function SyncHealthStatus({
  status,
  message,
  onResolve,
  className,
}: SyncHealthStatusProps) {
  if (status === 'healthy') return null;

  const config = {
    warning: {
      icon: AlertTriangle,
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      text: 'text-yellow-800 dark:text-yellow-200',
      iconColor: 'text-yellow-600 dark:text-yellow-400',
      title: 'Sync Warning',
      defaultMessage: 'Some dependencies couldn\'t be verified. Data may be incomplete.',
    },
    error: {
      icon: XCircle,
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      text: 'text-red-800 dark:text-red-200',
      iconColor: 'text-red-600 dark:text-red-400',
      title: 'Sync Error',
      defaultMessage: 'Unable to sync dependencies. Check your connection and try again.',
    },
  };

  const { icon: Icon, bg, border, text, iconColor, title, defaultMessage } =
    config[status] || config.warning;

  return (
    <div
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-lg border',
        bg,
        border,
        className
      )}
    >
      <Icon className={cn('w-5 h-5 flex-shrink-0', iconColor)} />
      <div className="flex-1 min-w-0">
        <p className={cn('text-sm font-medium', text)}>
          {title}
        </p>
        <p className={cn('text-xs mt-0.5 opacity-90', text)}>
          {message || defaultMessage}
        </p>
      </div>
      {onResolve && (
        <button
          onClick={onResolve}
          className={cn(
            'inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md',
            'bg-white/50 dark:bg-black/20 hover:bg-white/80 dark:hover:bg-black/30',
            'border border-current/20',
            'transition-colors',
            text
          )}
        >
          <RefreshCw className="w-3 h-3" />
          Retry
        </button>
      )}
    </div>
  );
}
