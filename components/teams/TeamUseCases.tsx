'use client'

import { Users, DollarSign, TrendingUp } from 'lucide-react';

export function TeamUseCases() {
  const cases = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: 'Cost Allocation & Chargebacks',
      problem: 'Finance needs to allocate AWS costs to business units',
      solution: [
        'Create teams matching org structure',
        'Tag services with team ownership',
        'Generate monthly cost reports by team',
        'Share reports with finance automatically',
      ],
      result: 'Clear cost attribution across 12 teams',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'On-Call Rotation',
      problem: 'Production incident - who owns this service?',
      solution: [
        'Every service has a team owner',
        'Team dashboard shows on-call schedule',
        'Slack integration alerts the right team',
        'Historical ownership tracking',
      ],
      result: 'Reduced MTTR by 40% with clear ownership',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Performance Benchmarking',
      problem: 'Which teams are deploying most frequently?',
      solution: [
        'Track deployment frequency by team',
        'Compare DORA metrics across teams',
        'Identify best practices from top performers',
        'Share learnings organization-wide',
      ],
      result: 'Deployment frequency up 3x across org',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          💼 Real-World Use Cases
        </h3>
        <p className="text-gray-600">
          See how teams use DevControl for better organization
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cases.map((useCase, index) => (
          <div
            key={index}
            className="bg-blue-50 rounded-lg border border-blue-200 p-6"
          >
            {/* Icon + Title */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                {useCase.icon}
              </div>
              <h4 className="font-semibold text-gray-900 text-sm">
                {useCase.title}
              </h4>
            </div>

            {/* Problem */}
            <div className="mb-4 pb-4 border-b border-blue-200">
              <p className="text-xs font-semibold text-gray-700 mb-1">
                Challenge:
              </p>
              <p className="text-sm text-gray-600">
                {useCase.problem}
              </p>
            </div>

            {/* Solution */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-700 mb-2">
                Solution:
              </p>
              <ul className="space-y-1.5">
                {useCase.solution.map((step, idx) => (
                  <li key={idx} className="flex items-start text-xs text-gray-600">
                    <span className="text-green-500 mr-2">✓</span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            {/* Result */}
            <div className="pt-4 border-t border-blue-200">
              <p className="text-sm font-semibold text-blue-700">
                {useCase.result}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
