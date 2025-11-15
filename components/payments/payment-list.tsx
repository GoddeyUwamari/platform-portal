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
import { AlertCircle, CreditCard, ChevronLeft, ChevronRight } from 'lucide-react';
import { PaymentStatusBadge } from './payment-status-badge';
import type { Payment } from '@/lib/types';

interface PaymentListProps {
  payments: Payment[];
  isLoading: boolean;
  error: Error | null;
  onRefetch: () => void;
  page: number;
  onPageChange: (page: number) => void;
  totalPages?: number;
}

export function PaymentList({
  payments,
  isLoading,
  error,
  onRefetch,
  page,
  onPageChange,
  totalPages = 1,
}: PaymentListProps) {
  // Format currency
  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100); // Assuming amount is in cents
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

  // Get payment method display
  const getPaymentMethodDisplay = (payment: Payment) => {
    if (payment.paymentMethodType) {
      return payment.paymentMethodType.charAt(0).toUpperCase() + payment.paymentMethodType.slice(1);
    }
    return payment.paymentMethod || 'N/A';
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
              <TableHead>Payment Method</TableHead>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Transaction ID</TableHead>
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
                  <Skeleton className="h-4 w-28" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
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
          <p className="font-medium text-foreground">Failed to load payments</p>
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
  if (!payments || payments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 space-y-4 border rounded-lg">
        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
          <CreditCard className="h-6 w-6 text-muted-foreground" />
        </div>
        <div className="text-center space-y-2">
          <p className="font-medium text-foreground">No payments found</p>
          <p className="text-sm text-muted-foreground">
            There are no payments matching your filters
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
              <TableHead>Payment Method</TableHead>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="min-w-[150px]">Transaction ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="whitespace-nowrap">
                  {formatDate(payment.createdAt)}
                </TableCell>
                <TableCell className="font-medium">
                  {formatCurrency(payment.amount, payment.currency)}
                </TableCell>
                <TableCell>
                  <PaymentStatusBadge status={payment.status} />
                </TableCell>
                <TableCell>{getPaymentMethodDisplay(payment)}</TableCell>
                <TableCell>
                  {payment.invoiceId ? (
                    <span className="text-sm font-mono">
                      {payment.invoiceId.substring(0, 12)}...
                    </span>
                  ) : (
                    <span className="text-muted-foreground">N/A</span>
                  )}
                </TableCell>
                <TableCell>
                  {payment.customerName || payment.customerId || 'N/A'}
                </TableCell>
                <TableCell>
                  <span className="text-sm font-mono">
                    {payment.transactionId}
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
