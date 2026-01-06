'use client';

import { Target, AlertTriangle, RefreshCw, TrendingDown } from 'lucide-react';

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
  examples: string[];
  stat: string;
  color: string;
}

export function DependencyBenefits() {
  const benefits: Benefit[] = [
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Impact Analysis',
      description: 'See downstream effects before making changes',
      examples: [
        'Identify blast radius of service changes',
        'Prevent cascading failures across services',
        'Plan deployments with confidence',
      ],
      stat: 'Reduce incidents by 60%',
      color: 'blue',
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: 'Critical Path Detection',
      description: 'Find single points of failure in your architecture',
      examples: [
        'Identify bottleneck services',
        'Prioritize reliability improvements',
        'Reduce incident MTTR by 40%',
      ],
      stat: 'Find 3-5 critical paths per system',
      color: 'red',
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: 'Circular Dependency Detection',
      description: 'Catch architectural issues before they become problems',
      examples: [
        'Prevent infinite loops and deadlocks',
        'Improve system design iteratively',
        'Enforce clean architecture patterns',
      ],
      stat: 'Catch issues in design phase',
      color: 'purple',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; icon: string; stat: string }> = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        icon: 'text-blue-600',
        stat: 'bg-blue-100 text-blue-700',
      },
      red: {
        bg: 'bg-red-50',
        border: 'border-red-200',
        icon: 'text-red-600',
        stat: 'bg-red-100 text-red-700',
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        icon: 'text-purple-600',
        stat: 'bg-purple-100 text-purple-700',
      },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-2">Why Track Service Dependencies?</h2>
        <p className="text-gray-600">
          Prevent incidents, reduce MTTR, and improve system reliability
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {benefits.map((benefit) => {
          const colors = getColorClasses(benefit.color);
          return (
            <div
              key={benefit.title}
              className={`rounded-lg border p-6 ${colors.bg} ${colors.border}`}
            >
              {/* Icon & Title */}
              <div className="mb-4">
                <div className={`inline-flex p-3 rounded-lg ${colors.icon} bg-white mb-3`}>
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>

              {/* Examples */}
              <ul className="space-y-2 mb-4">
                {benefit.examples.map((example, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>{example}</span>
                  </li>
                ))}
              </ul>

              {/* Stat */}
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${colors.stat}`}>
                {benefit.stat}
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional Stats Row */}
      <div className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold mb-1">60%</div>
            <div className="text-sm text-blue-100">Fewer Production Incidents</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-1">40%</div>
            <div className="text-sm text-blue-100">Faster Incident Resolution</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-1">85%</div>
            <div className="text-sm text-blue-100">Deployment Confidence</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-1">100%</div>
            <div className="text-sm text-blue-100">Architecture Visibility</div>
          </div>
        </div>
      </div>
    </div>
  );
}
