import { Activity, Lightbulb, Database } from 'lucide-react';

interface ValueProp {
  icon: React.ReactNode;
  title: string;
  benefits: string[];
  result: string;
}

export function InfrastructureValueProps() {
  const props: ValueProp[] = [
    {
      icon: <Activity className="w-6 h-6" />,
      title: 'Real-Time Cost Tracking',
      benefits: [
        'Monitor AWS spend across all services',
        'Set budget alerts and thresholds',
        'Track cost by tag, team, or environment',
        'Export reports for finance teams',
      ],
      result: 'Average 23% cost reduction in first 3 months',
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: 'Cost Optimization Insights',
      benefits: [
        'Identify idle resources (EC2, RDS, EBS)',
        'Right-size recommendations',
        'Unused elastic IPs and volumes',
        'Reserved Instance opportunities',
      ],
      result: 'Automated detection of $342/month in savings',
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: 'Resource Inventory & Compliance',
      benefits: [
        'Complete inventory of all AWS resources',
        'Track resource changes over time',
        'Tag compliance enforcement',
        'Resource lifecycle management',
      ],
      result: '100% visibility into your AWS infrastructure',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          🎯 Why Track Infrastructure?
        </h2>
        <p className="text-gray-600">
          Get insights that help your team optimize costs and improve reliability
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {props.map((prop, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border-l-4 border-orange-500 shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            {/* Icon */}
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 mb-4">
              {prop.icon}
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {prop.title}
            </h3>

            {/* Benefits List */}
            <ul className="space-y-2 mb-4">
              {prop.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start text-sm text-gray-600">
                  <span className="text-green-500 mr-2 mt-0.5">•</span>
                  {benefit}
                </li>
              ))}
            </ul>

            {/* Result */}
            <div className="pt-4 border-t border-gray-100">
              <p className="text-sm font-medium text-blue-600">
                ✨ Result: {prop.result}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
