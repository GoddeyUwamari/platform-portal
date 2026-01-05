import { TrendingUp, Users, Rocket } from 'lucide-react';

interface Benefit {
  icon: React.ReactNode;
  title: string;
  description: string;
  metrics: string[];
}

export function ServiceBenefits() {
  const benefits: Benefit[] = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Measure DORA',
      description: 'Track engineering performance automatically',
      metrics: [
        'Deployment frequency',
        'Lead time for changes',
        'Change failure rate',
        'Time to restore',
      ],
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Track Teams',
      description: 'Know who owns which services',
      metrics: [
        'Service ownership',
        'Team assignments',
        'Contact information',
        'On-call rotation',
      ],
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: 'Optimize Delivery',
      description: 'Improve deployment velocity',
      metrics: [
        'Identify bottlenecks',
        'Reduce lead time',
        'Improve frequency',
        '40% faster on average',
      ],
    },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Why Track Services?
        </h2>
        <p className="text-gray-600">
          Get insights that help your team ship faster and more reliably
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="p-6 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
              {benefit.icon}
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {benefit.title}
            </h3>

            <p className="text-sm text-gray-600 mb-4">
              {benefit.description}
            </p>

            <ul className="space-y-2">
              {benefit.metrics.map((metric, idx) => (
                <li key={idx} className="flex items-start text-sm text-gray-700">
                  <span className="text-green-500 mr-2">•</span>
                  {metric}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
