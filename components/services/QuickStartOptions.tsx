import Link from 'next/link';
import { Github, FileText, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickStartOption {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
  href: string;
  primary?: boolean;
}

export function QuickStartOptions() {
  const options: QuickStartOption[] = [
    {
      id: 'github',
      icon: <Github className="w-8 h-8" />,
      title: 'From GitHub',
      description: 'Import repositories automatically',
      badge: 'Recommended',
      href: '/settings/integrations?connect=github',
      primary: true,
    },
    {
      id: 'template',
      icon: <FileText className="w-8 h-8" />,
      title: 'From Template',
      description: 'Use pre-built configurations',
      badge: 'Fastest',
      href: '/services/templates',
    },
    {
      id: 'manual',
      icon: <Zap className="w-8 h-8" />,
      title: 'Manual Setup',
      description: 'Create from scratch via CLI',
      badge: 'Most flexible',
      href: '/services/new',
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Quick Start: Add Your First Service
        </h2>
        <p className="text-gray-600">
          Choose your preferred method to get started:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {options.map((option) => (
          <Link
            key={option.id}
            href={option.href}
            className={cn(
              'group relative flex flex-col p-6 rounded-lg border-2 transition-all',
              option.primary
                ? 'border-blue-200 bg-blue-50 hover:border-blue-300 hover:shadow-md'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
            )}
          >
            {/* Badge */}
            {option.badge && (
              <span className="absolute -top-2 left-6 px-3 py-1 text-xs font-semibold bg-blue-600 text-white rounded-full">
                {option.badge}
              </span>
            )}

            {/* Icon */}
            <div className={cn(
              'w-16 h-16 rounded-lg flex items-center justify-center mb-4',
              option.primary ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
            )}>
              {option.icon}
            </div>

            {/* Content */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {option.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4 flex-grow">
              {option.description}
            </p>

            {/* CTA */}
            <div className={cn(
              'flex items-center text-sm font-medium group-hover:translate-x-1 transition-transform',
              option.primary ? 'text-blue-600' : 'text-gray-700'
            )}>
              Get started
              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
