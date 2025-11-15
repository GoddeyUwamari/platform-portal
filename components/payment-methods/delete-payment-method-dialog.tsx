'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertCircle, Loader2 } from 'lucide-react';
import { paymentMethodsService } from '@/lib/services/payments.service';
import type { PaymentMethod } from '@/lib/types';

interface DeletePaymentMethodDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paymentMethod: PaymentMethod;
}

export function DeletePaymentMethodDialog({
  open,
  onOpenChange,
  paymentMethod,
}: DeletePaymentMethodDialogProps) {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string>('');

  const mutation = useMutation({
    mutationFn: (id: string) => paymentMethodsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods'] });
      onOpenChange(false);
      setError('');
    },
    onError: (error: Error) => {
      setError(error.message || 'Failed to delete payment method');
    },
  });

  const handleDelete = () => {
    setError('');
    mutation.mutate(paymentMethod.id);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Payment Method</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this payment method? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-lg border p-4 space-y-2 bg-muted/50">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Card</span>
            <span className="text-sm font-medium">
              {paymentMethod.brand?.toUpperCase() || 'CARD'} •••• {paymentMethod.last4}
            </span>
          </div>
          {paymentMethod.isDefault && (
            <div className="flex items-center gap-2 text-sm text-yellow-700 bg-yellow-50 p-2 rounded">
              <AlertCircle className="h-4 w-4" />
              <span>This is your default payment method</span>
            </div>
          )}
        </div>

        {error && (
          <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              onOpenChange(false);
              setError('');
            }}
            disabled={mutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={mutation.isPending}
          >
            {mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
