'use client';

import {
  Network,
  Play,
  Upload,
  FileCode,
  BookOpen,
  GitBranch,
  AlertTriangle,
  TrendingUp,
  Download,
  Users,
  Zap,
  Shield,
  Clock,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface EnhancedEmptyStateProps {
  onAddDependency: () => void;
  onEnableDemoMode: () => void;
  onImport?: () => void;
  hasServices?: boolean;
}

export function EnhancedEmptyState({
  onAddDependency,
  onEnableDemoMode,
  onImport,
  hasServices = true
}: EnhancedEmptyStateProps) {
  return (
    <div className="relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-purple-50/20 to-transparent dark:from-blue-950/20 dark:via-purple-950/10 pointer-events-none" />

      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center py-4 px-4">

        {/* Hero Section - Visual Preview */}
        <div className="mb-8 relative max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-2xl bg-white dark:bg-gray-900">
            {/* Mock dependency graph preview */}
            <div className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30">
              <div className="flex items-center justify-center gap-8">
                {/* Node 1 */}
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-blue-600 rounded-xl shadow-lg flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">API</span>
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400 mt-2">Gateway</span>
                </div>

                {/* Arrow */}
                <div className="flex flex-col items-center">
                  <svg width="60" height="4" viewBox="0 0 60 4" className="text-blue-600">
                    <line x1="0" y1="2" x2="50" y2="2" stroke="currentColor" strokeWidth="3"/>
                    <polygon points="50,0 60,2 50,4" fill="currentColor"/>
                  </svg>
                  <span className="text-xs text-blue-600 mt-1">depends on</span>
                </div>

                {/* Node 2 */}
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-purple-600 rounded-xl shadow-lg flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">Auth</span>
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400 mt-2">Service</span>
                </div>

                {/* Arrow */}
                <div className="flex flex-col items-center">
                  <svg width="60" height="4" viewBox="0 0 60 4" className="text-purple-600">
                    <line x1="0" y1="2" x2="50" y2="2" stroke="currentColor" strokeWidth="3"/>
                    <polygon points="50,0 60,2 50,4" fill="currentColor"/>
                  </svg>
                  <span className="text-xs text-purple-600 mt-1">depends on</span>
                </div>

                {/* Node 3 */}
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 bg-green-600 rounded-xl shadow-lg flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">DB</span>
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400 mt-2">PostgreSQL</span>
                </div>
              </div>

              {/* Preview badge */}
              <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                <Play className="w-3 h-3 inline mr-1" />
                Interactive Preview
              </div>
            </div>
          </div>

          {/* Caption */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
            Visualize your architecture in seconds
          </p>
        </div>

        {/* Headline */}
        <div className="text-center mb-4 max-w-5xl">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
            Map Your Service Architecture
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            Visualize microservice relationships to prevent incidents, deploy safely, and understand your system dependencies in real-time.
          </p>
        </div>

        {/* Stats / Social Proof */}
        <div className="flex items-center justify-center gap-8 mb-8 flex-wrap">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">60%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Faster debugging</div>
          </div>
          <div className="w-px h-12 bg-gray-200 dark:bg-gray-800" />
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">40%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Fewer incidents</div>
          </div>
          <div className="w-px h-12 bg-gray-200 dark:bg-gray-800" />
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">85%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Safer deployments</div>
          </div>
        </div>

        {/* Feature Grid - What You Can Do */}
        <div className="mb-12 w-full px-4">
          <h3 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
            Everything You Need to Manage Dependencies
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <FeatureCard
              icon={GitBranch}
              title="Visual Mapping"
              description="Interactive dependency graph"
              color="blue"
            />
            <FeatureCard
              icon={AlertTriangle}
              title="Impact Analysis"
              description="See what breaks before deploying"
              color="orange"
            />
            <FeatureCard
              icon={Target}
              title="Critical Paths"
              description="Identify single points of failure"
              color="red"
            />
            <FeatureCard
              icon={TrendingUp}
              title="Trend Tracking"
              description="Monitor dependency changes over time"
              color="green"
            />
            <FeatureCard
              icon={Download}
              title="Export Options"
              description="CSV, PNG, PDF reports"
              color="purple"
            />
            <FeatureCard
              icon={Zap}
              title="Keyboard Shortcuts"
              description="Navigate at lightning speed"
              color="yellow"
            />
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-12 w-full px-4">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            Get Started in 3 Simple Steps
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <StepCard
              number="1"
              icon={FileCode}
              title="Add Dependencies"
              description="Manually define service relationships or import from your infrastructure"
            />
            <StepCard
              number="2"
              icon={Network}
              title="Visualize Graph"
              description="See your architecture come to life with interactive visualization"
            />
            <StepCard
              number="3"
              icon={Shield}
              title="Analyze Impact"
              description="Understand dependencies and prevent incidents before deployment"
            />
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-4 mb-10">
          {/* Manual Entry */}
          <Card className="hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer group border-2">
            <CardHeader>
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileCode className="w-7 h-7 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-xl">Manual Entry</CardTitle>
              <CardDescription className="text-base">
                Add service dependencies one by one through our intuitive interface
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Quick to get started</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Full control over relationships</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
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

          {/* Demo Mode */}
          <Card className="hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer group border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50/50 to-transparent dark:from-purple-950/20">
            <CardHeader>
              <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Play className="w-7 h-7 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle className="text-xl">
                Try Demo Mode
                <span className="ml-2 text-xs bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 px-3 py-1 rounded-full font-normal">
                  Recommended
                </span>
              </CardTitle>
              <CardDescription className="text-base">
                Explore with realistic sample data to see the full power
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Realistic microservice architecture</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Test all features risk-free</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Perfect for learning the interface</span>
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
          <Card className="hover:shadow-xl hover:scale-105 transition-all duration-200 cursor-pointer group border-2 opacity-90">
            <CardHeader>
              <div className="w-14 h-14 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Upload className="w-7 h-7 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-xl">Import from Infrastructure</CardTitle>
              <CardDescription className="text-base">
                Auto-detect service dependencies from your codebase or infrastructure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Automatic service discovery</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>Kubernetes, Docker Compose support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-600 mt-0.5">⚡</span>
                  <span className="font-medium">Coming soon</span>
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

        {/* Use Cases */}
        <div className="mb-10 w-full px-4">
          <h3 className="text-xl font-semibold text-center mb-6 text-gray-900 dark:text-white">
            Common Use Cases
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <UseCaseCard
              icon={Clock}
              title="During Incidents"
              scenario="Production down? Identify the root cause service in seconds by following the dependency chain."
            />
            <UseCaseCard
              icon={Shield}
              title="Before Deployments"
              scenario="Planning a change? See which services will be impacted and notify the right teams."
            />
            <UseCaseCard
              icon={BookOpen}
              title="Architecture Reviews"
              scenario="Onboarding new engineers? Export the dependency graph as documentation."
            />
            <UseCaseCard
              icon={Users}
              title="Team Coordination"
              scenario="Multiple teams? Understand ownership and communication paths clearly."
            />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Need help getting started? Check out our{' '}
            <a href="/docs/dependencies" className="text-blue-600 dark:text-blue-400 hover:underline">
              documentation
            </a>
            {' '}or{' '}
            <a href="/docs/api" className="text-blue-600 dark:text-blue-400 hover:underline">
              API guide
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

// Feature Card Component
function FeatureCard({
  icon: Icon,
  title,
  description,
  color
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: 'blue' | 'green' | 'red' | 'orange' | 'purple' | 'yellow';
}) {
  const colorClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
    red: 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400',
    orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    yellow: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400',
  };

  return (
    <div className="flex items-start gap-3 p-4 bg-white/50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all">
      <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
          {title}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
}

// Step Card Component
function StepCard({
  number,
  icon: Icon,
  title,
  description
}: {
  number: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="relative">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4">
          <div className="w-16 h-16 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {number}
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>

      {/* Connector line (not on last item) */}
      {number !== "3" && (
        <div className="hidden md:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gradient-to-r from-blue-300 to-transparent dark:from-blue-800" />
      )}
    </div>
  );
}

// Use Case Card Component
function UseCaseCard({
  icon: Icon,
  title,
  scenario
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  scenario: string;
}) {
  return (
    <div className="flex items-start gap-4 p-5 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 hover:shadow-md transition-all">
      <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg flex-shrink-0">
        <Icon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {scenario}
        </p>
      </div>
    </div>
  );
}
