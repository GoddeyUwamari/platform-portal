import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HealthStatusBadge } from './health-status-badge';
import type { ServiceHealth } from '@/lib/types';
import {
  Server,
  Database,
  Shield,
  CreditCard,
  Bell,
  Cloud,
} from 'lucide-react';

interface ServiceHealthCardProps {
  service: ServiceHealth;
}

const serviceIcons: Record<string, React.ReactNode> = {
  'API Gateway': <Cloud className="h-5 w-5 text-blue-500" />,
  'Auth Service': <Shield className="h-5 w-5 text-purple-500" />,
  'Billing Service': <CreditCard className="h-5 w-5 text-green-500" />,
  'Payment Service': <CreditCard className="h-5 w-5 text-indigo-500" />,
  'Notification Service': <Bell className="h-5 w-5 text-orange-500" />,
  PostgreSQL: <Database className="h-5 w-5 text-blue-600" />,
  Redis: <Database className="h-5 w-5 text-red-500" />,
};

export function ServiceHealthCard({ service }: ServiceHealthCardProps) {
  const formatUptime = (uptime: number) => {
    if (uptime === 0) return 'N/A';

    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);

    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days}d ${hours % 24}h`;
    }

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }

    return `${minutes}m`;
  };

  const formatLastCheck = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const calculateUptimePercentage = () => {
    // For now, we'll base this on status
    // In a real implementation, this would be calculated from historical data
    if (service.status === 'healthy') return 99.9;
    if (service.status === 'degraded') return 95.0;
    return 0;
  };

  const getStatusColor = () => {
    switch (service.status) {
      case 'healthy':
        return 'border-green-500';
      case 'degraded':
        return 'border-yellow-500';
      case 'unhealthy':
        return 'border-red-500';
      default:
        return 'border-gray-300';
    }
  };

  return (
    <Card className={`transition-all hover:shadow-md border-l-4 ${getStatusColor()}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <div className="flex items-center space-x-3">
          {serviceIcons[service.name] || <Server className="h-5 w-5 text-gray-500" />}
          <CardTitle className="text-sm font-semibold">{service.name}</CardTitle>
        </div>
        <HealthStatusBadge status={service.status} />
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Response Time */}
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">Response Time</span>
          <span className="text-sm font-medium">
            {service.responseTime}ms
          </span>
        </div>

        {/* Uptime */}
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">Uptime</span>
          <span className="text-sm font-medium">
            {service.uptime > 0 ? formatUptime(service.uptime) : 'N/A'}
          </span>
        </div>

        {/* Uptime Percentage */}
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">Availability</span>
          <span className="text-sm font-medium">
            {service.status === 'unhealthy' ? '0%' : `${calculateUptimePercentage()}%`}
          </span>
        </div>

        {/* Version (if available) */}
        {service.version && (
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Version</span>
            <span className="text-sm font-medium font-mono text-xs">
              {service.version}
            </span>
          </div>
        )}

        {/* Last Check */}
        <div className="flex justify-between items-center pt-2 border-t">
          <span className="text-xs text-muted-foreground">Last Check</span>
          <span className="text-xs font-medium text-muted-foreground">
            {formatLastCheck(service.lastCheck)}
          </span>
        </div>

        {/* Error Message (if service is down) */}
        {service.error && service.status === 'unhealthy' && (
          <div className="pt-2 border-t">
            <p className="text-xs text-red-600 break-words">
              {service.error}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
