'use client';

import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { RefreshCw, Activity } from 'lucide-react';
import { monitoringService } from '@/lib/services/monitoring.service';
import { SystemHealthScore } from '@/components/monitoring/system-health-score';
import { ServiceHealthGrid } from '@/components/monitoring/service-health-grid';

export default function MonitoringPage() {
  // Fetch system health with auto-refresh every 30 seconds
  const {
    data: systemHealth,
    isLoading,
    error,
    refetch,
    dataUpdatedAt,
  } = useQuery({
    queryKey: ['system-health'],
    queryFn: () => monitoringService.getSystemHealth(),
    refetchInterval: 30000, // Auto-refresh every 30 seconds
    refetchOnWindowFocus: true,
  });

  const handleManualRefresh = () => {
    refetch();
  };

  const formatLastUpdate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Activity className="h-8 w-8" />
            System Monitoring
          </h1>
          <p className="text-muted-foreground mt-2">
            Monitor the health and performance of all microservices
          </p>
        </div>
        <div className="flex items-center gap-4">
          {dataUpdatedAt && (
            <p className="text-sm text-muted-foreground">
              Last update: {formatLastUpdate(dataUpdatedAt)}
            </p>
          )}
          <Button
            onClick={handleManualRefresh}
            variant="outline"
            size="sm"
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">
            {error instanceof Error ? error.message : 'Failed to fetch system health'}
          </span>
          <Button
            onClick={handleManualRefresh}
            variant="link"
            className="text-red-700 underline ml-4"
          >
            Try Again
          </Button>
        </div>
      )}

      {/* System Health Score */}
      {systemHealth && !error && (
        <SystemHealthScore systemHealth={systemHealth} />
      )}

      {/* Service Health Grid */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Service Status</h2>
        <ServiceHealthGrid
          services={systemHealth?.services || []}
          isLoading={isLoading}
        />
      </div>

      {/* Auto-refresh Notice */}
      <div className="text-center py-4 border-t">
        <p className="text-sm text-muted-foreground">
          Dashboard automatically refreshes every 30 seconds
        </p>
      </div>
    </div>
  );
}
