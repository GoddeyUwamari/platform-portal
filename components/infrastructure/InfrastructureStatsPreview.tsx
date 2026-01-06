import { DollarSign, Server, TrendingUp, Lightbulb } from 'lucide-react';

interface StatCard {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  description: string;
  color: string;
}

export function InfrastructureStatsPreview() {
  const stats: StatCard[] = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: 'Total Cost',
      value: '$2,847.32',
      subtitle: 'per month',
      description: 'Auto-updated daily',
      color: 'blue',
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: 'Resources',
      value: '47',
      subtitle: 'tracked',
      description: '3 regions',
      color: 'green',
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: 'Savings',
      value: '$342/mo',
      subtitle: 'potential',
      description: '3 insights',
      color: 'orange',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Trend',
      value: '↗ +12%',
      subtitle: 'vs last month',
      description: 'Forecast: $3K',
      color: 'purple',
    },
  ];

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
    purple: 'bg-purple-100 text-purple-600',
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                {stat.icon}
              </div>
            </div>

            <h3 className="text-sm font-medium text-gray-600 mb-2">
              {stat.title}
            </h3>

            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl font-bold text-gray-900">
                {stat.value}
              </span>
              <span className="text-sm text-gray-500">
                {stat.subtitle}
              </span>
            </div>

            <p className="text-xs text-gray-500">
              {stat.description}
            </p>
          </div>
        ))}
      </div>

      <p className="text-center text-sm text-gray-500 mt-4">
        Example data - Connect AWS to see your actual costs
      </p>
    </div>
  );
}
