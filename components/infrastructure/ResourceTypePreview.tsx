export function ResourceTypePreview() {
  const services = [
    { name: 'EC2', type: 'Compute', count: '12 instances' },
    { name: 'RDS', type: 'Database', count: '4 DBs' },
    { name: 'S3', type: 'Storage', count: '23 buckets' },
    { name: 'ELB', type: 'Network', count: '3 LBs' },
    { name: 'ECS', type: 'Container', count: '6 services' },
    { name: 'Lambda', type: 'Serverless', count: '15 functions' },
  ];

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3">
          Comprehensive AWS Service Coverage
        </h2>
        <p className="text-base text-muted-foreground">
          Track all major AWS services with real-time resource counts and costs
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-gray-50 rounded-lg border border-gray-200 p-4 text-center opacity-60"
          >
            <div className="font-semibold text-gray-900 mb-2">
              {service.name}
            </div>
            <div className="text-xs text-muted-foreground mb-2">{service.type}</div>
            <div className="text-sm font-medium text-gray-600">
              {service.count}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
