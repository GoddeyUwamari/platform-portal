'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CreditCard, MoreVertical, Star, Trash2 } from 'lucide-react';
import type { PaymentMethod } from '@/lib/types';
import { DeletePaymentMethodDialog } from './delete-payment-method-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { paymentMethodsService } from '@/lib/services/payments.service';

interface PaymentMethodCardProps {
  paymentMethod: PaymentMethod;
}

export function PaymentMethodCard({ paymentMethod }: PaymentMethodCardProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const setDefaultMutation = useMutation({
    mutationFn: (id: string) => paymentMethodsService.setDefault(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods'] });
    },
  });

  const getCardBrandLogo = (brand?: string) => {
    // In a real app, you'd return actual brand logos
    return brand?.toUpperCase() || 'CARD';
  };

  const getCardBrandColor = (brand?: string) => {
    const colors: Record<string, string> = {
      visa: 'bg-blue-600',
      mastercard: 'bg-orange-600',
      amex: 'bg-blue-800',
      discover: 'bg-orange-500',
    };
    return colors[brand?.toLowerCase() || ''] || 'bg-gray-600';
  };

  const formatExpiry = () => {
    if (!paymentMethod.expiryMonth || !paymentMethod.expiryYear) {
      return 'N/A';
    }
    return `${paymentMethod.expiryMonth.toString().padStart(2, '0')}/${paymentMethod.expiryYear.toString().slice(-2)}`;
  };

  return (
    <>
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-16 h-10 rounded flex items-center justify-center text-white text-xs font-bold ${getCardBrandColor(paymentMethod.brand)}`}>
              {getCardBrandLogo(paymentMethod.brand)}
            </div>
            <div className="flex items-center gap-2">
              {paymentMethod.isDefault && (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  Default
                </Badge>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {!paymentMethod.isDefault && (
                    <DropdownMenuItem
                      onClick={() => setDefaultMutation.mutate(paymentMethod.id)}
                      disabled={setDefaultMutation.isPending}
                    >
                      <Star className="h-4 w-4 mr-2" />
                      Set as Default
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={() => setDeleteDialogOpen(true)}
                    className="text-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Card Number</p>
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-muted-foreground" />
                <p className="font-mono text-sm">
                  •••• •••• •••• {paymentMethod.last4 || '****'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Expiry Date</p>
                <p className="text-sm font-medium">{formatExpiry()}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Type</p>
                <p className="text-sm font-medium capitalize">
                  {paymentMethod.type || 'Card'}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <DeletePaymentMethodDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        paymentMethod={paymentMethod}
      />
    </>
  );
}
