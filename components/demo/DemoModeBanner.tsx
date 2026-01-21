'use client'

import { X, Play, AlertCircle, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface DemoModeBannerProps {
  onExit: () => void
}

export function DemoModeBanner({ onExit }: DemoModeBannerProps) {
  return (
    <div className="bg-gradient-to-r from-purple-600 via-purple-600 to-indigo-600 text-white px-6 py-4 rounded-xl mb-6 shadow-lg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Icon */}
            <div className="p-2.5 bg-white/20 rounded-lg backdrop-blur-sm">
              <Play className="w-5 h-5" />
            </div>

            {/* Content */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-lg">Demo Mode Active</h3>
                <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Sample Data
                </span>
              </div>
              <p className="text-sm text-purple-100">
                You're viewing sample dependencies. Toggle demo mode off to see your real data.
              </p>
            </div>
          </div>

          {/* Exit Button */}
          <Button
            onClick={onExit}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20 border border-white/30 hover:border-white/50 transition-all"
          >
            <X className="w-4 h-4 mr-2" />
            Exit Demo Mode
          </Button>
        </div>

        {/* Info */}
        <div className="mt-4 flex items-start gap-2 text-sm text-purple-100 bg-white/10 rounded-lg p-3 backdrop-blur-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <p>
            Changes made in demo mode won't be saved. Perfect for exploring features without affecting your real infrastructure.
            Press <kbd className="px-1.5 py-0.5 bg-white/20 rounded text-xs font-mono mx-1">D</kbd> to toggle demo mode.
          </p>
        </div>
      </div>
    </div>
  )
}
