'use client'

import { Users, Code, Server, Database, Cloud, Shield } from 'lucide-react';

interface TeamTemplate {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  services: string[];
  members: number;
  color: string;
}

export function TeamTemplates() {
  const templates: TeamTemplate[] = [
    {
      id: 'frontend',
      name: 'Frontend Team',
      icon: <Code className="w-6 h-6" />,
      description: 'Web and mobile applications',
      services: ['React App', 'Mobile App', 'Design System'],
      members: 8,
      color: 'blue',
    },
    {
      id: 'backend',
      name: 'Backend Team',
      icon: <Server className="w-6 h-6" />,
      description: 'APIs and microservices',
      services: ['User API', 'Payment API', 'Auth Service'],
      members: 12,
      color: 'green',
    },
    {
      id: 'data',
      name: 'Data Team',
      icon: <Database className="w-6 h-6" />,
      description: 'Analytics and data infrastructure',
      services: ['Data Pipeline', 'Analytics DB', 'ETL Jobs'],
      members: 6,
      color: 'purple',
    },
    {
      id: 'platform',
      name: 'Platform Team',
      icon: <Cloud className="w-6 h-6" />,
      description: 'Infrastructure and DevOps',
      services: ['CI/CD', 'Monitoring', 'K8s Cluster'],
      members: 5,
      color: 'orange',
    },
    {
      id: 'security',
      name: 'Security Team',
      icon: <Shield className="w-6 h-6" />,
      description: 'Security and compliance',
      services: ['WAF', 'Security Audit', 'IAM Policies'],
      members: 4,
      color: 'red',
    },
  ];

  const getColorClasses = (color: string) => {
    const classes = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600',
      red: 'bg-red-100 text-red-600',
    };
    return classes[color as keyof typeof classes] || classes.blue;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          📋 Common Team Structures
        </h3>
        <p className="text-gray-600">
          Get started quickly with pre-built team templates
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="group bg-white rounded-lg border-2 border-gray-200 p-6 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
          >
            {/* Icon + Name */}
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(template.color)}`}>
                {template.icon}
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">
                  {template.name}
                </h4>
                <p className="text-xs text-gray-500">
                  {template.members} members
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-4">
              {template.description}
            </p>

            {/* Example Services */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-gray-700 mb-2">
                Example Services:
              </p>
              <div className="space-y-1.5">
                {template.services.map((service, idx) => (
                  <div key={idx} className="flex items-center text-xs text-gray-600">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                    {service}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <button className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors group-hover:bg-blue-600 group-hover:text-white">
              Use This Template →
            </button>
          </div>
        ))}

        {/* Custom Template Option */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-dashed border-gray-300 p-6 flex flex-col items-center justify-center text-center hover:border-blue-300 transition-colors cursor-pointer">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">+</span>
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">
            Custom Team
          </h4>
          <p className="text-sm text-gray-600 mb-4">
            Start from scratch with your own structure
          </p>
          <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
            Create Custom →
          </button>
        </div>
      </div>
    </div>
  );
}
