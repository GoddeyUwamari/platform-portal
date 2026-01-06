'use client';

import { Rocket, AlertCircle, GitBranch, Lightbulb } from 'lucide-react';

interface UseCase {
  scenario: string;
  icon: React.ReactNode;
  problem: string;
  solution: string;
  outcome: string;
  color: string;
}

export function DependencyUseCases() {
  const cases: UseCase[] = [
    {
      scenario: 'Before Deploying',
      icon: <Rocket className="w-5 h-5" />,
      problem: 'Will this change break other services?',
      solution: 'Run impact analysis to see all affected downstream services',
      outcome: 'Deploy safely with 95% confidence, zero surprise breakages',
      color: 'blue',
    },
    {
      scenario: 'During Incidents',
      icon: <AlertCircle className="w-5 h-5" />,
      problem: 'What\'s the blast radius of this outage?',
      solution: 'View dependency graph in real-time to identify all affected services',
      outcome: 'Triage 60% faster, communicate impact to stakeholders immediately',
      color: 'red',
    },
    {
      scenario: 'Architecture Reviews',
      icon: <GitBranch className="w-5 h-5" />,
      problem: 'Are we building a distributed monolith?',
      solution: 'Detect circular dependencies and identify tightly-coupled services',
      outcome: 'Improve system design iteratively, prevent architectural debt',
      color: 'purple',
    },
    {
      scenario: 'Capacity Planning',
      icon: <Lightbulb className="w-5 h-5" />,
      problem: 'Which services need scaling first?',
      solution: 'Identify critical path services that are bottlenecks',
      outcome: 'Prioritize infrastructure spend on high-impact services',
      color: 'green',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; icon: string; outcome: string }> = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        icon: 'bg-blue-100 text-blue-600',
        outcome: 'text-blue-700',
      },
      red: {
        bg: 'bg-red-50',
        border: 'border-red-200',
        icon: 'bg-red-100 text-red-600',
        outcome: 'text-red-700',
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        icon: 'bg-purple-100 text-purple-600',
        outcome: 'text-purple-700',
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        icon: 'bg-green-100 text-green-600',
        outcome: 'text-green-700',
      },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-2 border-blue-200 p-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 mb-2">
          <Lightbulb className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-semibold">Real-World Use Cases</h2>
        </div>
        <p className="text-gray-600">
          See how teams use dependency mapping to solve everyday challenges
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cases.map((useCase) => {
          const colors = getColorClasses(useCase.color);
          return (
            <div
              key={useCase.scenario}
              className={`bg-white rounded-lg p-6 border ${colors.border} hover:shadow-lg transition-shadow`}
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2 rounded-lg ${colors.icon}`}>{useCase.icon}</div>
                <h3 className="font-semibold text-lg text-gray-900">{useCase.scenario}</h3>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
                    Problem
                  </div>
                  <p className="text-sm text-gray-700">{useCase.problem}</p>
                </div>

                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
                    Solution
                  </div>
                  <p className="text-sm text-gray-700">{useCase.solution}</p>
                </div>

                <div className={`pt-3 border-t ${colors.border}`}>
                  <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
                    Outcome
                  </div>
                  <p className={`text-sm font-medium ${colors.outcome}`}>
                    ✓ {useCase.outcome}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Testimonial */}
      <div className="mt-6 bg-white rounded-lg p-6 border-2 border-blue-200">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
              JD
            </div>
          </div>
          <div>
            <p className="text-gray-700 italic mb-3">
              "Dependency mapping saved us during a critical incident. We identified the blast
              radius in seconds and communicated the impact to leadership immediately. What used to
              take 30 minutes of manual investigation now takes 10 seconds."
            </p>
            <div className="text-sm">
              <div className="font-semibold text-gray-900">Jane Doe</div>
              <div className="text-gray-500">Platform Engineering Lead, TechCorp</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
