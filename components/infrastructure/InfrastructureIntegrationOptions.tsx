import { Shield, Key, Building2 } from 'lucide-react';

interface IntegrationOption {
  icon: React.ReactNode;
  title: string;
  badge: string;
  badgeColor: string;
  features: string[];
  action: string;
  disabled?: boolean;
}

export function InfrastructureIntegrationOptions() {
  const options: IntegrationOption[] = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'IAM Role',
      badge: 'Recommended',
      badgeColor: 'green',
      features: [
        'Read-only access',
        'No credentials stored',
        'Auto-rotate permissions',
        'AWS best practice',
      ],
      action: 'Setup IAM Role',
    },
    {
      icon: <Key className="w-8 h-8" />,
      title: 'Access Keys',
      badge: 'Quick Start',
      badgeColor: 'blue',
      features: [
        'Simple configuration',
        'Faster setup',
        'Less secure',
        'Manual key rotation',
      ],
      action: 'Use Access Keys',
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: 'AWS Organizations',
      badge: 'Coming Soon',
      badgeColor: 'gray',
      features: [
        'Multi-account support',
        'Centralized management',
        'Consolidated billing',
        'Complex setup',
      ],
      action: 'Notify Me',
      disabled: true,
    },
  ];

  const getBadgeClasses = (color: string) => {
    const classes = {
      green: 'bg-green-100 text-green-700',
      blue: 'bg-blue-100 text-blue-700',
      gray: 'bg-gray-100 text-gray-700',
    };
    return classes[color as keyof typeof classes] || classes.gray;
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          🔗 Choose Your Integration Method
        </h2>
        <p className="text-gray-600">
          Select the best way to connect your AWS account
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {options.map((option, index) => (
          <div
            key={index}
            className={`relative bg-white rounded-lg border-2 p-6 transition-all ${
              option.disabled
                ? 'border-gray-200 opacity-60'
                : 'border-gray-200 hover:border-blue-300 hover:shadow-md cursor-pointer'
            }`}
          >
            {/* Badge */}
            <div className={`absolute -top-3 left-6 px-3 py-1 rounded-full text-xs font-semibold ${getBadgeClasses(option.badgeColor)}`}>
              {option.badge}
            </div>

            {/* Icon */}
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4 mx-auto mt-2">
              {option.icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-4">
              {option.title}
            </h3>

            {/* Features */}
            <ul className="space-y-2 mb-6">
              {option.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-sm text-gray-600">
                  <span className="text-blue-500 mr-2">•</span>
                  {feature}
                </li>
              ))}
            </ul>

            {/* Action Button */}
            <button
              disabled={option.disabled}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                option.disabled
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {option.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
