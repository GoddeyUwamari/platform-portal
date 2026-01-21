import { DollarSign, TrendingDown, Zap } from 'lucide-react';

interface OptimizationInsight {
  type: string;
  savings: string;
  details: string[];
  icon: React.ReactNode;
}

export function CostOptimizationPreview() {
  const insights: OptimizationInsight[] = [
    {
      type: 'Idle Resources',
      savings: '$180/mo',
      details: [
        '3 stopped EC2 instances',
        '2 unattached EBS volumes (50GB each)',
      ],
      icon: <DollarSign className="w-5 h-5" />,
    },
    {
      type: 'Right-Sizing',
      savings: '$95/mo',
      details: [
        'RDS db.m5.large over-provisioned',
        'Recommend: db.t3.medium saves $95',
      ],
      icon: <TrendingDown className="w-5 h-5" />,
    },
    {
      type: 'Unused Resources',
      savings: '$67/mo',
      details: [
        '4 Elastic IPs not attached',
        '1 NAT Gateway with no traffic',
      ],
      icon: <Zap className="w-5 h-5" />,
    },
  ];

  const totalSavings = 342;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
          Automated Cost Optimization Insights
        </h2>
        <p className="text-base text-muted-foreground">
          AI-powered recommendations to reduce AWS spending automatically
        </p>
      </div>

      {/* Insights List */}
      <div className="space-y-4 mb-6">
        {insights.map((insight, index) => (
          <div
            key={index}
            className="flex items-start justify-between p-4 bg-orange-50 rounded-lg border border-orange-200"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                  {insight.icon}
                </div>
                <h3 className="font-semibold text-gray-900">
                  {insight.type}
                </h3>
              </div>

              <ul className="ml-11 space-y-1">
                {insight.details.map((detail, idx) => (
                  <li key={idx} className="text-sm text-gray-600">
                    • {detail}
                  </li>
                ))}
              </ul>
            </div>

            <div className="ml-4 text-right">
              <div className="text-2xl font-bold text-orange-600">
                {insight.savings}
              </div>
              <button className="text-xs text-blue-600 hover:text-blue-700 font-medium mt-1">
                View Details →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-900">
            Total Potential Savings
          </span>
          <span className="text-3xl font-bold text-orange-600">
            ${totalSavings}/month
          </span>
        </div>
      </div>
    </div>
  );
}
