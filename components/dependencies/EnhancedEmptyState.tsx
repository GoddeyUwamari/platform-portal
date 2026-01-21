'use client'

import { Network, Play, Upload, FileCode, BookOpen, Zap, Shield, GitBranch } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface EnhancedEmptyStateProps {
  onAddDependency: () => void
  onEnableDemoMode: () => void
  onImport?: () => void
  hasServices?: boolean
}

export function EnhancedEmptyState({
  onAddDependency,
  onEnableDemoMode,
  onImport,
  hasServices = true,
}: EnhancedEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {/* Hero Illustration - Gradient placeholder with animated icon */}
      <div className="mb-8 relative w-full max-w-md">
        <div className="w-64 h-64 mx-auto bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-pink-900/30 rounded-3xl flex items-center justify-center relative overflow-hidden shadow-xl">
          {/* Animated shimmer overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />

          {/* Decorative connection lines */}
          <svg
            className="absolute inset-0 w-full h-full opacity-20"
            viewBox="0 0 256 256"
          >
            <circle cx="64" cy="64" r="8" fill="currentColor" className="text-blue-600" />
            <circle cx="192" cy="64" r="8" fill="currentColor" className="text-purple-600" />
            <circle cx="128" cy="128" r="12" fill="currentColor" className="text-indigo-600" />
            <circle cx="64" cy="192" r="8" fill="currentColor" className="text-green-600" />
            <circle cx="192" cy="192" r="8" fill="currentColor" className="text-orange-600" />
            <line x1="64" y1="64" x2="128" y2="128" stroke="currentColor" strokeWidth="2" className="text-blue-400" />
            <line x1="192" y1="64" x2="128" y2="128" stroke="currentColor" strokeWidth="2" className="text-purple-400" />
            <line x1="64" y1="192" x2="128" y2="128" stroke="currentColor" strokeWidth="2" className="text-green-400" />
            <line x1="192" y1="192" x2="128" y2="128" stroke="currentColor" strokeWidth="2" className="text-orange-400" />
          </svg>

          {/* Main icon */}
          <Network className="w-28 h-28 text-blue-600 dark:text-blue-400 relative z-10 drop-shadow-lg" />
        </div>
      </div>

      {/* Headline */}
      <div className="text-center mb-6 max-w-2xl">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Start Mapping Your Service Dependencies
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Visualize relationships between services to prevent incidents,
          deploy safely, and understand your system architecture.
        </p>
      </div>

      {/* Value Props */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 max-w-4xl w-full">
        <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
          <div className="p-2 bg-blue-100 dark:bg-blue-800 rounded-lg shrink-0">
            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
              Prevent Incidents
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              See what will break before you deploy
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
          <div className="p-2 bg-green-100 dark:bg-green-800 rounded-lg shrink-0">
            <Zap className="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
              Debug Faster
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Find root cause in seconds, not hours
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-100 dark:border-purple-800">
          <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-lg shrink-0">
            <GitBranch className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
              Document Architecture
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Auto-generated, always up-to-date
            </p>
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
        {/* Manual Entry */}
        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:border-blue-300 dark:hover:border-blue-700">
          <CardHeader>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
              <FileCode className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="text-lg">Manual Entry</CardTitle>
            <CardDescription>
              Add dependencies one by one through our intuitive interface
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">&#10003;</span>
                <span>Quick to get started</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">&#10003;</span>
                <span>Full control over relationships</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">&#10003;</span>
                <span>No setup required</span>
              </li>
            </ul>
            <Button
              onClick={onAddDependency}
              className="w-full"
              size="lg"
              disabled={!hasServices}
            >
              <FileCode className="w-4 h-4 mr-2" />
              {hasServices ? 'Add First Dependency' : 'Add Services First'}
            </Button>
            {!hasServices && (
              <p className="text-xs text-muted-foreground mt-2 text-center">
                You need to create services before adding dependencies
              </p>
            )}
          </CardContent>
        </Card>

        {/* Demo Mode - Highlighted */}
        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-2 border-purple-200 dark:border-purple-800 hover:border-purple-400 dark:hover:border-purple-600 relative overflow-hidden">
          {/* Popular badge */}
          <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
            Popular
          </div>
          <CardHeader>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
              <Play className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <CardTitle className="text-lg">Try Demo Mode</CardTitle>
            <CardDescription>
              Explore with sample data to see how it works
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">&#10003;</span>
                <span>Realistic sample data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">&#10003;</span>
                <span>Test all features</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">&#10003;</span>
                <span>Perfect for learning</span>
              </li>
            </ul>
            <Button
              onClick={onEnableDemoMode}
              className="w-full bg-purple-600 hover:bg-purple-700"
              size="lg"
            >
              <Play className="w-4 h-4 mr-2" />
              Enable Demo Mode
            </Button>
          </CardContent>
        </Card>

        {/* Import */}
        <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:border-green-300 dark:hover:border-green-700 opacity-80">
          <CardHeader>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
              <Upload className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-lg">Import from Code</CardTitle>
            <CardDescription>
              Auto-detect dependencies from your codebase
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">&#10003;</span>
                <span>Automatic discovery</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">&#10003;</span>
                <span>Always up-to-date</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 mt-0.5">&#9889;</span>
                <span>Coming soon</span>
              </li>
            </ul>
            <Button
              onClick={onImport}
              className="w-full"
              variant="outline"
              size="lg"
              disabled
            >
              <Upload className="w-4 h-4 mr-2" />
              Coming Soon
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Help Links */}
      <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-sm">
        <a
          href="#"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          <span>View Documentation</span>
        </a>
        <a
          href="#"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <FileCode className="w-4 h-4" />
          <span>API Integration</span>
        </a>
      </div>
    </div>
  )
}
