import { TrendingUp, AlertTriangle, MapPin } from 'lucide-react';

export function InfrastructurePreview() {
  const services = [
    { icon: '🖥️', name: 'EC2', cost: '$1,200', count: '12 instances' },
    { icon: '🗄️', name: 'RDS', cost: '$890', count: '4 DBs' },
    { icon: '📦', name: 'S3', cost: '$245', count: '23 buckets' },
    { icon: '🌐', name: 'ELB', cost: '$312', count: '3 LBs' },
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          📊 Preview: Your Infrastructure Dashboard
        </h2>
        <p className="text-gray-600">
          This is what you&apos;ll see after connecting AWS
        </p>
      </div>

      {/* Mock Dashboard */}
      <div className="bg-gradient-to-br from-blue-50 to-gray-50 rounded-lg border-2 border-blue-200 p-6">
        {/* Header Stats */}
        <div className="flex flex-wrap items-center gap-6 mb-6 pb-4 border-b border-gray-200">
          <div>
            <div className="text-3xl font-bold text-gray-900">$2,847.32</div>
            <div className="text-sm text-gray-500">Monthly Cost</div>
          </div>

          <div className="flex items-center gap-2 text-green-600">
            <TrendingUp className="w-5 h-5" />
            <span className="font-semibold">+12%</span>
          </div>

          <div className="flex items-center gap-2 text-orange-600">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-semibold">3 Alerts</span>
          </div>

          <div className="flex items-center gap-2 text-blue-600">
            <MapPin className="w-5 h-5" />
            <span className="font-semibold">3 Regions</span>
          </div>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 p-4 text-center"
            >
              <div className="text-3xl mb-2">{service.icon}</div>
              <div className="font-semibold text-gray-900 mb-1">
                {service.name}
              </div>
              <div className="text-lg font-bold text-blue-600 mb-1">
                {service.cost}
              </div>
              <div className="text-xs text-gray-500">{service.count}</div>
            </div>
          ))}
        </div>

        {/* Cost Trend Graph */}
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-3">
            Cost Trend - Last 30 Days
          </h4>
          <div className="flex items-end justify-between h-20 gap-1">
            {[...Array(30)].map((_, i) => {
              const height = Math.random() * 100;
              return (
                <div
                  key={i}
                  className="flex-1 bg-blue-500 rounded-t"
                  style={{ height: `${height}%` }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
          Connect AWS Now →
        </button>
        <button className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50">
          View Live Demo →
        </button>
      </div>
    </div>
  );
}
