import { Briefcase, Search, Target } from 'lucide-react';

interface UseCase {
  icon: React.ReactNode;
  title: string;
  problem?: string;
  before?: string[];
  after: string[];
  timeSaved?: string;
  result?: string;
}

export function InfrastructureUseCases() {
  const cases: UseCase[] = [
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: 'Monthly Cost Review Meeting',
      before: [
        'Manually download CSV from AWS Cost Explorer',
        'Spend 3 hours in Excel creating charts',
        'Data is already 1 day old',
        'Can\'t drill down by team or service',
      ],
      after: [
        'Open dashboard with real-time data',
        'Pre-built charts and breakdowns',
        'Filter by team, environment, or tag',
        'Export professional PDF report instantly',
      ],
      timeSaved: '3 hours → 5 minutes',
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: 'Investigating Cost Spike',
      problem: 'AWS bill increased by $800 this month',
      after: [
        'View cost trend graph (spike on Sept 15)',
        'Filter by date range (Sept 10-20)',
        'See EC2 costs jumped 300%',
        'Drill into specific instances',
        'Find: 5 m5.xlarge left running from testing',
      ],
      result: 'Root cause found in 10 minutes vs 2 hours',
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Budget Enforcement',
      problem: 'Keep dev environment costs under $500/month',
      after: [
        'Set budget alert: $500 threshold',
        'Get Slack notification at 80% ($400)',
        'Dashboard shows: Currently $420 (84%)',
        'View breakdown: RDS = $180, EC2 = $150, etc.',
        'Take action before hitting limit',
      ],
      result: 'Zero budget overruns in 6 months',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
          Enterprise Use Cases
        </h2>
        <p className="text-base text-muted-foreground">
          How engineering and finance teams leverage DevControl for AWS cost management
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
              <h3 className="font-semibold text-gray-900">
                {useCase.title}
              </h3>
            </div>

            {/* Problem */}
            {useCase.problem && (
              <div className="mb-4 pb-4 border-b border-blue-200">
                <p className="text-sm font-medium text-gray-700">
                  Problem: {useCase.problem}
                </p>
              </div>
            )}

            {/* Before */}
            {useCase.before && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-700 mb-2">
                  Before DevControl:
                </p>
                <ul className="space-y-1">
                  {useCase.before.map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start">
                      <span className="text-red-500 mr-2 flex-shrink-0">×</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* After */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-700 mb-2">
                {useCase.before ? 'After DevControl:' : 'Solution with DevControl:'}
              </p>
              <ul className="space-y-1">
                {useCase.after.map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-600 flex items-start">
                    <span className="text-green-500 mr-2 flex-shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Result */}
            <div className="pt-4 border-t border-blue-200">
              <p className="text-sm font-semibold text-blue-700">
                {useCase.timeSaved || useCase.result}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
