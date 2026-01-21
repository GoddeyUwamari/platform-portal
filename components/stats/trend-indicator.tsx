'use client'

import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { TrendData } from '@/types/trends'
import { cn } from '@/lib/utils'

interface TrendIndicatorProps {
  trend: TrendData
  variant?: 'default' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export function TrendIndicator({
  trend,
  variant = 'default',
  size = 'md',
}: TrendIndicatorProps) {
  // Determine if the trend is positive based on direction and variant
  const isPositive = () => {
    if (trend.direction === 'neutral') return null

    // For danger variant (e.g., errors, costs), down is good
    if (variant === 'danger') {
      return trend.direction === 'down'
    }

    // For other variants, up is good
    return trend.direction === 'up'
  }

  const positive = isPositive()

  // Get color classes based on whether trend is positive/negative
  const getColorClasses = () => {
    if (positive === null) {
      return {
        bg: 'bg-gray-100 dark:bg-gray-800',
        text: 'text-gray-600 dark:text-gray-400',
        icon: 'text-gray-500',
      }
    }

    if (positive) {
      return {
        bg: 'bg-green-50 dark:bg-green-900/30',
        text: 'text-green-700 dark:text-green-400',
        icon: 'text-green-600 dark:text-green-400',
      }
    }

    return {
      bg: 'bg-red-50 dark:bg-red-900/30',
      text: 'text-red-700 dark:text-red-400',
      icon: 'text-red-600 dark:text-red-400',
    }
  }

  const colors = getColorClasses()

  const Icon =
    trend.direction === 'up'
      ? TrendingUp
      : trend.direction === 'down'
        ? TrendingDown
        : Minus

  const sizeClasses = {
    sm: {
      container: 'text-xs gap-1',
      badge: 'px-2 py-0.5 rounded-md',
      icon: 'w-3 h-3',
    },
    md: {
      container: 'text-sm gap-1.5',
      badge: 'px-2.5 py-1 rounded-lg',
      icon: 'w-4 h-4',
    },
    lg: {
      container: 'text-base gap-2',
      badge: 'px-3 py-1.5 rounded-lg',
      icon: 'w-5 h-5',
    },
  }

  const sizes = sizeClasses[size]

  return (
    <div className={cn('flex items-center flex-wrap', sizes.container)}>
      {/* Trend badge with icon and percentage */}
      <div className={cn('inline-flex items-center gap-1', sizes.badge, colors.bg)}>
        <Icon className={cn(sizes.icon, colors.icon)} />
        <span className={cn('font-semibold', colors.text)}>
          {trend.changePercent > 0 ? '+' : ''}
          {trend.changePercent.toFixed(1)}%
        </span>
      </div>

      {/* Absolute change and label */}
      <span className="text-gray-500 dark:text-gray-400">
        <span className="font-medium">
          {trend.change > 0 ? '+' : ''}
          {trend.change}
        </span>{' '}
        <span className="text-gray-400 dark:text-gray-500">{trend.label}</span>
      </span>
    </div>
  )
}
