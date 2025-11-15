'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle, DollarSign, ChevronLeft, ChevronRight } from 'lucide-react';
import { RefundStatusBadge } from './refund-status-badge';
import type { Refund } from '@/lib/types';

interface RefundListProps {
  refunds: Refund[];
  isLoading: boolean;
  error: Error | null;
  onRefetch: () => void;
  page: number;
  onPageChange: (page: number) => void;
  totalPages?: number;
}

export function RefundList({
  refunds,
  isLoading,
  error,
  onRefetch,
  page,
  onPageChange,
  totalPages = 1,
}: RefundListProps) {
  // Format currency
  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Payment ID</TableHead>
              <TableHead>Refund ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(10)].map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-40" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-28" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-28" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4 border rounded-lg">
        <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
          <AlertCircle className="h-6 w-6 text-red-600" />
        </div>
        <div className="text-center space-y-2">
          <p className="font-medium text-foreground">Failed to load refunds</p>
          <p className="text-sm text-muted-foreground">
            {error instanceof Error ? error.message : 'An error occurred'}
          </p>
        </div>
        <Button onClick={onRefetch} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  // Empty State
  if (!refunds || refunds.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4 border rounded-lg">
        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
          <DollarSign className="h-6 w-6 text-muted-foreground" />
        </div>
        <div className="text-center space-y-2">
          <p className="font-medium text-foreground">No refunds found</p>
          <p className="text-sm text-muted-foreground">
            There are no refunds matching your filters
          </p>
        </div>
      </div>
    );
  }

  // Data Table
  return (
    <div className="space-y-4">
      <div className="border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead className="min-w-[150px]">Payment ID</TableHead>
              <TableHead className="min-w-[150px]">Refund ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {refunds.map((refund) => (
              <TableRow key={refund.id}>
                <TableCell className="whitespace-nowrap">
                  {formatDate(refund.createdAt)}
                </TableCell>
                <TableCell className="font-medium">
                  {formatCurrency(refund.amount, refund.currency)}
                </TableCell>
                <TableCell>
                  <RefundStatusBadge status={refund.status} />
                </TableCell>
                <TableCell>
                  <span className="text-sm capitalize">
                    {refund.reason?.replace(/_/g, ' ') || 'N/A'}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-mono">
                    {refund.paymentId.substring(0, 16)}...
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-sm font-mono">
                    {refund.id.substring(0, 16)}...
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(page - 1)}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onPageChange(page + 1)}
              disabled={page === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
