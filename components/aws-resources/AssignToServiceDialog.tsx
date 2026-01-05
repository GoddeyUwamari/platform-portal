/**
 * AssignToServiceDialog Component
 * Allows Pro+ users to assign AWS resources to services for cost attribution
 */

'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Layers, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AssignToServiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedResourceIds: string[];
  onSuccess: () => void;
}

// Mock services data - in production, fetch from API
const MOCK_SERVICES = [
  { id: '1', name: 'api-gateway', template: 'node-api', team: 'Backend Team' },
  { id: '2', name: 'auth-service', template: 'node-api', team: 'Backend Team' },
  { id: '3', name: 'web-app', template: 'react', team: 'Frontend Team' },
  { id: '4', name: 'data-pipeline', template: 'python', team: 'Data Team' },
  { id: '5', name: 'ml-model', template: 'python', team: 'Data Team' },
];

export function AssignToServiceDialog({
  open,
  onOpenChange,
  selectedResourceIds,
  onSuccess,
}: AssignToServiceDialogProps) {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [services, setServices] = useState(MOCK_SERVICES);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setSelectedServiceId('');
    }
  }, [open]);

  const handleAssign = async () => {
    if (!selectedServiceId && selectedServiceId !== 'unassign') {
      toast.error('Please select a service');
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const selectedService = services.find(s => s.id === selectedServiceId);
      const action = selectedServiceId === 'unassign' ? 'Unassigned' : `Assigned to ${selectedService?.name}`;

      toast.success(`${action} successfully`, {
        description: `${selectedResourceIds.length} resource${selectedResourceIds.length !== 1 ? 's' : ''} updated`,
      });

      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      toast.error('Assignment failed', {
        description: error.message || 'Failed to assign resources to service',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedService = services.find(s => s.id === selectedServiceId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <Layers className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <DialogTitle>Assign to Service</DialogTitle>
              <DialogDescription>
                Assign {selectedResourceIds.length} resource{selectedResourceIds.length !== 1 ? 's' : ''} to a service
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="service">Select Service</Label>
            <Select value={selectedServiceId} onValueChange={setSelectedServiceId}>
              <SelectTrigger id="service">
                <SelectValue placeholder="Choose a service..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unassign">
                  <span className="text-muted-foreground">— Unassign (remove service) —</span>
                </SelectItem>
                {services.map((service) => (
                  <SelectItem key={service.id} value={service.id}>
                    <div className="flex items-center gap-2">
                      <span className="font-mono">{service.name}</span>
                      <Badge variant="outline" className="text-xs">{service.template}</Badge>
                      <span className="text-xs text-muted-foreground">{service.team}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedService && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Resources will be linked to <strong className="font-mono">{selectedService.name}</strong> (owned by {selectedService.team})
              </AlertDescription>
            </Alert>
          )}

          {selectedServiceId === 'unassign' && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Service assignment will be removed. Resources will appear as &quot;Unassigned&quot; in cost reports.
              </AlertDescription>
            </Alert>
          )}

          <div className="p-4 bg-muted/50 rounded-lg space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Selected Resources:</span>
              <Badge variant="secondary">{selectedResourceIds.length}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Service attribution will help track per-service AWS costs
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleAssign} disabled={isSubmitting || !selectedServiceId}>
            {isSubmitting ? 'Assigning...' : 'Assign to Service'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
