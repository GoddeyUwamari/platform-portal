import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { SystemHealth } from '@/lib/types';
import { CheckCircle2, AlertTriangle, XCircle, Activity } from 'lucide-react';

interface SystemHealthScoreProps {
  systemHealth: SystemHealth;
}

export function SystemHealthScore({ systemHealth }: SystemHealthScoreProps) {
  const getStatusConfig = () => {
    switch (systemHealth.status) {
      case 'operational':
        return {
          icon: <CheckCircle2 className="h-8 w-8 text-green-500" />,
          bgColor: 'bg-green-50',
          borderColor: 'border-green-500',
          textColor: 'text-green-700',
          message: 'All Systems Operational',
          description: 'All services are running normally',
        };
      case 'degraded':
        return {
          icon: <AlertTriangle className="h-8 w-8 text-yellow-500" />,
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-500',
          textColor: 'text-yellow-700',
          message: 'Degraded Performance',
          description: 'Some services are experiencing issues',
        };
      case 'disrupted':
        return {
          icon: <XCircle className="h-8 w-8 text-red-500" />,
          bgColor: 'bg-red-50',
          borderColor: 'border-red-500',
          textColor: 'text-red-700',
          message: 'Service Disruption',
          description: 'Multiple services are down',
        };
    }
  };

  const config = getStatusConfig();

  const formatLastUpdate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <Card className={`border-l-4 ${config.borderColor} ${config.bgColor}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Activity className="h-5 w-5" />
            System Health Status
          </CardTitle>
          {config.icon}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status Message */}
        <div className="space-y-1">
          <h3 className={`text-2xl font-bold ${config.textColor}`}>
            {config.message}
          </h3>
          <p className="text-sm text-muted-foreground">
            {config.description}
          </p>
        </div>

        {/* Services Status */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Services Online</p>
            <p className="text-3xl font-bold">
              {systemHealth.servicesUp}/{systemHealth.totalServices}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Health Score</p>
            <p className="text-3xl font-bold">{systemHealth.healthPercentage}%</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                systemHealth.healthPercentage === 100
                  ? 'bg-green-500'
                  : systemHealth.healthPercentage >= 70
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
              style={{ width: `${systemHealth.healthPercentage}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground text-right">
            Last updated: {formatLastUpdate(systemHealth.lastUpdate)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
