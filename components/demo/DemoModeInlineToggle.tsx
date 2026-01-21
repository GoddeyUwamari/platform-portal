'use client'

import { Play } from 'lucide-react'
import { Switch } from '@/components/ui/switch'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface DemoModeInlineToggleProps {
  enabled: boolean
  onToggle: (enabled: boolean) => void
}

export function DemoModeInlineToggle({ enabled, onToggle }: DemoModeInlineToggleProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 cursor-pointer ${
              enabled
                ? 'border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/30'
                : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
            onClick={() => onToggle(!enabled)}
          >
            <Play
              className={`w-4 h-4 transition-colors ${
                enabled ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400'
              }`}
            />
            <span
              className={`text-sm font-medium transition-colors ${
                enabled
                  ? 'text-purple-700 dark:text-purple-300'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              Demo
            </span>
            <Switch
              checked={enabled}
              onCheckedChange={onToggle}
              className="data-[state=checked]:bg-purple-600"
            />
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p className="text-sm">
            {enabled
              ? 'Viewing sample data. Click to see real data.'
              : 'Click to explore with sample data'}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
