'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { DollarSign, TrendingUp, XCircle, RefreshCcw } from 'lucide-react';
import { paymentsService, refundsService } from '@/lib/services/payments.service';

export function PaymentStatsCards() {
  const { data: paymentStats, isLoading: isLoadingPayments } = useQuery({
    queryKey: ['payment-stats'],
    queryFn: () => paymentsService.getStats(),
  });

  const { data: refundStats, isLoading: isLoadingRefunds } = useQuery({
    queryKey: ['refund-stats'],
    queryFn: () => refundsService.getStats(),
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount / 100);
  };

  const calculateSuccessRate = () => {
    if (!paymentStats || paymentStats.totalCount === 0) return 0;
    return ((paymentStats.successfulCount / paymentStats.totalCount) * 100).toFixed(1);
  };

  if (isLoadingPayments || isLoadingRefunds) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-4 rounded" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-24 mb-2" />
              <Skeleton className="h-3 w-40" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Payments */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Processed</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {paymentStats ? formatCurrency(paymentStats.totalAmount) : '$0.00'}
          </div>
          <p className="text-xs text-muted-foreground">
            {paymentStats?.totalCount || 0} transactions
          </p>
        </CardContent>
      </Card>

      {/* Success Rate */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{calculateSuccessRate()}%</div>
          <p className="text-xs text-muted-foreground">
            {paymentStats?.successfulCount || 0} successful payments
          </p>
        </CardContent>
      </Card>

      {/* Failed Payments */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Failed Payments</CardTitle>
          <XCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{paymentStats?.failedCount || 0}</div>
          <p className="text-xs text-muted-foreground">
            Requires attention
          </p>
        </CardContent>
      </Card>

      {/* Total Refunded */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Refunded</CardTitle>
          <RefreshCcw className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {paymentStats ? formatCurrency(paymentStats.refundedAmount) : '$0.00'}
          </div>
          <p className="text-xs text-muted-foreground">
            {refundStats?.totalCount || 0} refunds issued
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
