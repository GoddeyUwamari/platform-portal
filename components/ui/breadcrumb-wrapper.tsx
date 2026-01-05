/**
 * BreadcrumbWrapper Component
 * Helper component for pages that need custom breadcrumb labels
 * Example: Show service name instead of service ID
 */

'use client';

import { Breadcrumb, BreadcrumbItem } from './breadcrumb';
import { useBreadcrumbs } from '@/lib/hooks/useBreadcrumbs';

interface BreadcrumbWrapperProps {
  customLabels?: Record<string, string>;
  items?: BreadcrumbItem[];
  className?: string;
}

/**
 * Wrapper component that uses either custom items or auto-generated breadcrumbs
 *
 * Usage 1 - Auto-generate with custom labels for IDs:
 * <BreadcrumbWrapper customLabels={{ [serviceId]: serviceName }} />
 *
 * Usage 2 - Provide custom breadcrumb items:
 * <BreadcrumbWrapper items={[{ label: 'Dashboard', href: '/dashboard' }, ...]} />
 *
 * Usage 3 - Auto-generate (default):
 * <BreadcrumbWrapper />
 */
export function BreadcrumbWrapper({
  customLabels,
  items,
  className,
}: BreadcrumbWrapperProps) {
  const autoBreadcrumbs = useBreadcrumbs(customLabels);

  return <Breadcrumb items={items || autoBreadcrumbs} className={className} />;
}
