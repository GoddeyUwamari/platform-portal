'use client';

import { ServiceHealthCard } from './service-health-card';
import { Skeleton } from '@/components/ui/skeleton';
import type { ServiceHealth } from '@/lib/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface ServiceHealthGridProps {
  services: ServiceHealth[];
  isLoading?: boolean;
}

export function ServiceHealthGrid({ services, isLoading }: ServiceHealthGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {[...Array(7)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-6 w-16" />
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-12" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-12" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-12" />
              </div>
              <Skeleton className="h-4 w-full mt-4" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!services || services.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No services to display</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {services.map((service) => (
        <ServiceHealthCard key={service.name} service={service} />
      ))}
    </div>
  );
}
