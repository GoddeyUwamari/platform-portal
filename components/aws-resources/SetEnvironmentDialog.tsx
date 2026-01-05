/**
 * SetEnvironmentDialog Component
 * Allows Pro+ users to set environment labels for AWS resources
 */

'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Tags, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface SetEnvironmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedResourceIds: string[];
  onSuccess: () => void;
}

const ENVIRONMENTS = [
  { value: 'production', label: 'Production', color: 'bg-red-100 text-red-700' },
  { value: 'staging', label: 'Staging', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'development', label: 'Development', color: 'bg-blue-100 text-blue-700' },
  { value: 'qa', label: 'QA / Testing', color: 'bg-purple-100 text-purple-700' },
  { value: 'demo', label: 'Demo', color: 'bg-green-100 text-green-700' },
];

export function SetEnvironmentDialog({
  open,
  onOpenChange,
  selectedResourceIds,
  onSuccess,
}: SetEnvironmentDialogProps) {
  const [selectedEnvironment, setSelectedEnvironment] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setSelectedEnvironment('');
    }
  }, [open]);

  const handleSet = async () => {
    if (!selectedEnvironment && selectedEnvironment !== 'unset') {
      toast.error('Please select an environment');
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const env = ENVIRONMENTS.find(e => e.value === selectedEnvironment);
      const action = selectedEnvironment === 'unset' ? 'Environment cleared' : `Set to ${env?.label}`;

      toast.success(`${action} successfully`, {
        description: `${selectedResourceIds.length} resource${selectedResourceIds.length !== 1 ? 's' : ''} updated`,
      });

      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      toast.error('Update failed', {
        description: error.message || 'Failed to set environment',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedEnv = ENVIRONMENTS.find(e => e.value === selectedEnvironment);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <Tags className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <DialogTitle>Set Environment</DialogTitle>
              <DialogDescription>
                Set environment label for {selectedResourceIds.length} resource{selectedResourceIds.length !== 1 ? 's' : ''}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="environment">Select Environment</Label>
            <Select value={selectedEnvironment} onValueChange={setSelectedEnvironment}>
              <SelectTrigger id="environment">
                <SelectValue placeholder="Choose an environment..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unset">
                  <span className="text-muted-foreground">— Clear environment —</span>
                </SelectItem>
                {ENVIRONMENTS.map((env) => (
                  <SelectItem key={env.value} value={env.value}>
                    <div className="flex items-center gap-2">
                      <Badge className={env.color}>{env.label}</Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedEnv && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Resources will be labeled as <Badge className={selectedEnv.color}>{selectedEnv.label}</Badge> environment
              </AlertDescription>
            </Alert>
          )}

          {selectedEnvironment === 'unset' && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Environment label will be removed. Resources will appear as "Unassigned" in cost reports.
              </AlertDescription>
            </Alert>
          )}

          <div className="p-4 bg-muted/50 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Selected Resources:</span>
              <Badge variant="secondary">{selectedResourceIds.length}</Badge>
            </div>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>💡 <strong>Tip:</strong> Use environments to:</p>
              <ul className="list-disc list-inside ml-2 space-y-0.5">
                <li>Track production vs staging costs</li>
                <li>Identify wasteful non-prod spending</li>
                <li>Enable environment-based cost reports</li>
              </ul>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSet} disabled={isSubmitting || !selectedEnvironment}>
            {isSubmitting ? 'Updating...' : 'Set Environment'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
