'use client';

import Link from 'next/link';
import { Edit, Code, Zap, ArrowRight } from 'lucide-react';

interface Integration {
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  features: string[];
  cta: string;
  href: string;
  color: string;
}

export function DependencyIntegrations() {
  const integrations: Integration[] = [
    {
      icon: <Edit className="w-8 h-8" />,
      title: 'Manual Entry',
      description: 'Add dependencies one by one through the UI',
      badge: 'Fastest to Start',
      features: [
        'Simple form-based interface',
        'Perfect for <20 services',
        'No technical setup required',
        'Get started in 2 minutes',
      ],
      cta: 'Add Dependency',
      href: '/dependencies/new',
      color: 'blue',
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Import from Code',
      description: 'Auto-detect dependencies from your codebase',
      badge: 'Most Automated',
      features: [
        'Parse package.json, go.mod, etc.',
        'Auto-discover service relationships',
        'Keep dependencies in sync',
        'Supports 10+ languages',
      ],
      cta: 'Import Dependencies',
      href: '/dependencies/import',
      color: 'green',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'API Integration',
      description: 'Programmatically manage dependencies via REST API',
      badge: 'Most Flexible',
      features: [
        'RESTful API endpoints',
        'CI/CD pipeline integration',
        'Dynamic architecture updates',
        'Webhook notifications',
      ],
      cta: 'View API Docs',
      href: '/docs/api/dependencies',
      color: 'purple',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<
      string,
      { bg: string; border: string; icon: string; badge: string; button: string }
    > = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        icon: 'text-blue-600',
        badge: 'bg-blue-100 text-blue-700',
        button: 'text-blue-600 hover:text-blue-700',
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        icon: 'text-green-600',
        badge: 'bg-green-100 text-green-700',
        button: 'text-green-600 hover:text-green-700',
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        icon: 'text-purple-600',
        badge: 'bg-purple-100 text-purple-700',
        button: 'text-purple-600 hover:text-purple-700',
      },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-2">3 Ways to Add Dependencies</h2>
        <p className="text-gray-600">Choose the method that works best for your workflow</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {integrations.map((integration) => {
          const colors = getColorClasses(integration.color);
          return (
            <div
              key={integration.title}
              className={`rounded-lg border p-6 ${colors.bg} ${colors.border} hover:shadow-md transition-shadow`}
            >
              {/* Icon & Badge */}
              <div className="mb-4">
                <div className={`inline-flex p-3 rounded-lg ${colors.icon} bg-white mb-3`}>
                  {integration.icon}
                </div>
                {integration.badge && (
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-semibold ${colors.badge} mb-2`}
                  >
                    {integration.badge}
                  </span>
                )}
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{integration.title}</h3>
                <p className="text-sm text-gray-600">{integration.description}</p>
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {integration.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={integration.href}
                className={`inline-flex items-center gap-1 font-medium ${colors.button}`}
              >
                {integration.cta}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          );
        })}
      </div>

      {/* API Example */}
      <div className="mt-6 bg-gray-900 rounded-lg p-6 text-white">
        <h3 className="text-lg font-semibold mb-3">API Example</h3>
        <pre className="text-sm font-mono bg-gray-800 p-4 rounded overflow-x-auto">
          <code>
            {`POST /api/dependencies
{
  "source_service_id": "api-gateway-uuid",
  "target_service_id": "auth-service-uuid",
  "dependency_type": "runtime",
  "is_critical": true,
  "description": "Auth validation for all requests"
}`}
          </code>
        </pre>
        <p className="text-sm text-gray-400 mt-3">
          Integrate with your CI/CD pipeline to automatically update dependencies on every deploy
        </p>
      </div>
    </div>
  );
}
