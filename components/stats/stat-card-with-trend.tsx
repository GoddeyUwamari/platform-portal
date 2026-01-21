'use client'

import { useEffect, useState } from 'react'
import { TrendIndicator } from './trend-indicator'
import { MiniSparkline } from './mini-sparkline'
import { StatWithTrend } from '@/types/trends'
import { cn } from '@/lib/utils'
import { getAccessibleStatDescription } from '@/lib/utils/accessibility'

interface StatCardWithTrendProps {
  stat: StatWithTrend
  loading?: boolean
  lastUpdated?: Date | string
}

// Hook for count-up animation
function useCountUp(target: number, duration: number = 800) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [target, duration])

  return count
}

export function StatCardWithTrend({ stat, loading, lastUpdated }: StatCardWithTrendProps) {
  const animatedValue = useCountUp(loading ? 0 : stat.value)

  if (loading) {
    return (
      <div
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 relative overflow-hidden"
        role="status"
        aria-label="Loading statistics"
        aria-busy="true"
      >
        {/* Screen reader announcement */}
        <span className="sr-only">Loading {stat.label} data...</span>

        {/* Shimmer overlay */}
        <div
          className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-gray-100/50 dark:via-gray-800/50 to-transparent"
          aria-hidden="true"
        />

        {/* Content skeleton */}
        <div className="relative z-10" aria-hidden="true">
          <div className="flex items-center justify-between mb-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
            <div className="h-10 w-10 bg-gray-200 dark:bg-gray-800 rounded-lg" />
          </div>
          <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-3" />
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3 mb-4" />
          <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded w-full" />
        </div>
      </div>
    )
  }

  const Icon = stat.icon

  // Color schemes for different stat types
  const colorSchemes = {
    default: {
      iconBg: 'bg-blue-100 dark:bg-blue-900/40',
      iconColor: 'text-blue-600 dark:text-blue-400',
      gradient: 'from-blue-50 to-transparent dark:from-blue-900/20',
      border: 'border-blue-100 dark:border-blue-900/50',
      hoverBorder: 'hover:border-blue-300 dark:hover:border-blue-700',
      ring: 'ring-blue-100 dark:ring-blue-900/50',
    },
    success: {
      iconBg: 'bg-green-100 dark:bg-green-900/40',
      iconColor: 'text-green-600 dark:text-green-400',
      gradient: 'from-green-50 to-transparent dark:from-green-900/20',
      border: 'border-green-100 dark:border-green-900/50',
      hoverBorder: 'hover:border-green-300 dark:hover:border-green-700',
      ring: 'ring-green-100 dark:ring-green-900/50',
    },
    danger: {
      iconBg: 'bg-red-100 dark:bg-red-900/40',
      iconColor: 'text-red-600 dark:text-red-400',
      gradient: 'from-red-50 to-transparent dark:from-red-900/20',
      border: 'border-red-100 dark:border-red-900/50',
      hoverBorder: 'hover:border-red-300 dark:hover:border-red-700',
      ring: 'ring-red-100 dark:ring-red-900/50',
    },
    warning: {
      iconBg: 'bg-orange-100 dark:bg-orange-900/40',
      iconColor: 'text-orange-600 dark:text-orange-400',
      gradient: 'from-orange-50 to-transparent dark:from-orange-900/20',
      border: 'border-orange-100 dark:border-orange-900/50',
      hoverBorder: 'hover:border-orange-300 dark:hover:border-orange-700',
      ring: 'ring-orange-100 dark:ring-orange-900/50',
    },
  }

  const colors = colorSchemes[stat.variant || 'default']

  // Determine sparkline color based on trend direction and variant
  const getSparklineColor = (): 'green' | 'red' | 'blue' | 'gray' | 'purple' | 'orange' => {
    if (stat.trend.direction === 'neutral') return 'gray'

    // For danger variant, down is good (green), up is bad (red)
    if (stat.variant === 'danger') {
      return stat.trend.direction === 'up' ? 'red' : 'green'
    }

    // For other variants, up is good (green), down is bad (red)
    return stat.trend.direction === 'up' ? 'green' : 'red'
  }

  // Generate accessible description for screen readers
  const accessibleDescription = getAccessibleStatDescription({
    label: stat.label,
    value: stat.value,
    trend: stat.trend,
  })

  return (
    <article
      className={cn(
        'group relative bg-white dark:bg-gray-900 border rounded-xl p-6 transition-all duration-300',
        'hover:shadow-xl hover:-translate-y-1',
        colors.border,
        colors.hoverBorder
      )}
      role="region"
      aria-label={stat.label}
    >
      {/* Screen reader description - hidden visually */}
      <span className="sr-only">{accessibleDescription}</span>

      {/* Gradient Background on Hover */}
      <div
        className={cn(
          'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none',
          colors.gradient
        )}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Header with icon and label */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p
              className="text-sm font-medium text-gray-600 dark:text-gray-400"
              id={`stat-label-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {stat.label}
            </p>
          </div>

          {Icon && (
            <div
              className={cn(
                'p-2.5 rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-md',
                colors.iconBg
              )}
              aria-hidden="true"
            >
              <Icon className={cn('w-5 h-5', colors.iconColor)} />
            </div>
          )}
        </div>

        {/* Main value with count-up animation */}
        <div className="mb-3">
          <div
            className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight tabular-nums"
            aria-describedby={`stat-label-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {animatedValue.toLocaleString()}
          </div>
        </div>

        {/* Trend indicator */}
        <div className="mb-4">
          <TrendIndicator trend={stat.trend} variant={stat.variant} size="sm" />
        </div>

        {/* Sparkline */}
        {stat.trend.sparklineData && stat.trend.sparklineData.length > 0 && (
          <div
            className="pt-4 border-t border-gray-100 dark:border-gray-800"
            aria-hidden="true"
          >
            <MiniSparkline
              data={stat.trend.sparklineData}
              color={getSparklineColor()}
              height={50}
              showGradient={true}
            />
          </div>
        )}

        {/* Last updated timestamp */}
        {lastUpdated && (
          <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              <span className="sr-only">Last updated: </span>
              Updated{' '}
              <time dateTime={new Date(lastUpdated).toISOString()}>
                {new Date(lastUpdated).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </time>
            </p>
          </div>
        )}
      </div>
    </article>
  )
}
