/**
 * BulkRemediationDialog Component
 * Allows Enterprise users to perform bulk remediation actions on AWS resources
 * Actions: Encrypt, Restrict Access, Delete Orphaned, Enable Backup
 */

'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';
import { Shield, Lock, Trash2, Database, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface BulkRemediationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedResourceIds: string[];
  selectedResources?: any[]; // Full resource objects for context
  onSuccess: () => void;
}

type RemediationAction = 'encrypt' | 'restrict' | 'delete_orphaned' | 'enable_backup';

const REMEDIATION_ACTIONS = [
  {
    id: 'encrypt' as RemediationAction,
    icon: Lock,
    title: 'Enable Encryption',
    description: 'Enable encryption at rest for unencrypted RDS and EBS volumes',
    impact: 'Medium',
    risk: 'Low - No data loss, minimal downtime',
    color: 'text-blue-600',
  },
  {
    id: 'restrict' as RemediationAction,
    icon: Shield,
    title: 'Restrict Public Access',
    description: 'Remove public access from S3 buckets and security groups',
    impact: 'High',
    risk: 'Medium - May break public-facing resources',
    color: 'text-orange-600',
  },
  {
    id: 'delete_orphaned' as RemediationAction,
    icon: Trash2,
    title: 'Delete Orphaned Resources',
    description: 'Permanently delete unused resources (stopped instances, unattached volumes)',
    impact: 'High',
    risk: 'High - Permanent deletion, cannot be undone',
    color: 'text-red-600',
  },
  {
    id: 'enable_backup' as RemediationAction,
    icon: Database,
    title: 'Enable Backup',
    description: 'Enable automated backups for RDS databases and EBS volumes',
    impact: 'Low',
    risk: 'Very Low - Adds cost but improves resilience',
    color: 'text-green-600',
  },
];

export function BulkRemediationDialog({
  open,
  onOpenChange,
  selectedResourceIds,
  selectedResources = [],
  onSuccess,
}: BulkRemediationDialogProps) {
  const [selectedAction, setSelectedAction] = useState<RemediationAction>('encrypt');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  const handleSubmit = async () => {
    const action = REMEDIATION_ACTIONS.find(a => a.id === selectedAction);

    if (!action) return;

    // High-risk actions require confirmation
    if (action.risk.includes('High') && confirmText !== 'CONFIRM') {
      toast.error('Please type CONFIRM to proceed with this high-risk action');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast.success(`${action.title} initiated`, {
        description: `Processing ${selectedResourceIds.length} resource${selectedResourceIds.length !== 1 ? 's' : ''}. This may take a few minutes.`,
      });

      onSuccess();
      onOpenChange(false);
      setConfirmText('');
    } catch (error: any) {
      toast.error('Remediation failed', {
        description: error.message || 'Failed to execute remediation action',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentAction = REMEDIATION_ACTIONS.find(a => a.id === selectedAction);
  const requiresConfirmation = currentAction?.risk.includes('High');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <DialogTitle>Bulk Remediation</DialogTitle>
              <DialogDescription>
                Execute remediation actions on {selectedResourceIds.length} selected resource{selectedResourceIds.length !== 1 ? 's' : ''}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Enterprise Feature Badge */}
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertDescription>
              <strong>Enterprise Feature:</strong> Bulk remediation allows you to fix compliance and security issues at scale.
            </AlertDescription>
          </Alert>

          {/* Action Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Select Remediation Action</Label>
            <RadioGroup value={selectedAction} onValueChange={(value) => setSelectedAction(value as RemediationAction)}>
              <div className="space-y-3">
                {REMEDIATION_ACTIONS.map((action) => {
                  const Icon = action.icon;
                  return (
                    <div
                      key={action.id}
                      className={`flex items-start space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedAction === action.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedAction(action.id)}
                    >
                      <RadioGroupItem value={action.id} id={action.id} className="mt-1" />
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <Icon className={`h-4 w-4 ${action.color}`} />
                          <Label htmlFor={action.id} className="font-medium cursor-pointer">
                            {action.title}
                          </Label>
                        </div>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                        <div className="flex gap-2">
                          <Badge variant="secondary" className="text-xs">
                            Impact: {action.impact}
                          </Badge>
                          <Badge
                            variant={action.risk.includes('High') ? 'destructive' : 'secondary'}
                            className="text-xs"
                          >
                            Risk: {action.risk}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </RadioGroup>
          </div>

          {/* High-Risk Warning */}
          {requiresConfirmation && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>Warning:</strong> This is a high-risk action that cannot be undone. Please review the selected resources carefully before proceeding.
                <div className="mt-3">
                  <Label htmlFor="confirm-input" className="text-sm">
                    Type <strong>CONFIRM</strong> to proceed:
                  </Label>
                  <input
                    id="confirm-input"
                    type="text"
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    className="mt-2 w-full px-3 py-2 border rounded-md bg-background"
                    placeholder="CONFIRM"
                  />
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* Selected Resources Summary */}
          <div className="p-4 bg-muted/50 rounded-lg space-y-2">
            <div className="font-medium text-sm">Selected Resources ({selectedResourceIds.length})</div>
            <div className="text-xs text-muted-foreground">
              {selectedResources.length > 0 ? (
                <div className="space-y-1">
                  {selectedResources.slice(0, 3).map((resource: any) => (
                    <div key={resource.id}>
                      • {resource.resource_name || resource.resource_id} ({resource.resource_type})
                    </div>
                  ))}
                  {selectedResources.length > 3 && (
                    <div>+ {selectedResources.length - 3} more...</div>
                  )}
                </div>
              ) : (
                `${selectedResourceIds.length} resource${selectedResourceIds.length !== 1 ? 's' : ''} selected`
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || (requiresConfirmation && confirmText !== 'CONFIRM')}
          >
            {isSubmitting ? 'Processing...' : `Execute ${currentAction?.title}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
