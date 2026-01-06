export function ResourceTypePreview() {
  const services = [
    { icon: '🖥️', name: 'EC2', type: 'Compute', count: '12 instances' },
    { icon: '🗄️', name: 'RDS', type: 'Database', count: '4 DBs' },
    { icon: '📦', name: 'S3', type: 'Storage', count: '23 buckets' },
    { icon: '🌐', name: 'ELB', type: 'Network', count: '3 LBs' },
    { icon: '🔄', name: 'ECS', type: 'Container', count: '6 services' },
    { icon: 'λ', name: 'Lambda', type: 'Serverless', count: '15 functions' },
  ];

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          📊 AWS Services We Track
        </h2>
        <p className="text-sm text-gray-600">
          Example counts - Your actual resources will appear here
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-lg border border-gray-200 p-4 text-center opacity-60"
          >
            <div className="text-3xl mb-2">{service.icon}</div>
            <div className="font-semibold text-gray-900 mb-1">
              {service.name}
            </div>
            <div className="text-xs text-gray-500 mb-2">{service.type}</div>
            <div className="text-sm font-medium text-gray-600">
              {service.count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
