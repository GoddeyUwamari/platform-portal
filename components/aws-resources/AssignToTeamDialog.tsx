/**
 * AssignToTeamDialog Component
 * Allows Pro+ users to assign AWS resources to teams for cost attribution
 */

'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Users, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AssignToTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedResourceIds: string[];
  onSuccess: () => void;
}

// Mock teams data - in production, fetch from API
const MOCK_TEAMS = [
  { id: '1', name: 'Platform Engineering', owner: 'platform@company.com' },
  { id: '2', name: 'Frontend Team', owner: 'frontend@company.com' },
  { id: '3', name: 'Backend Team', owner: 'backend@company.com' },
  { id: '4', name: 'Data Team', owner: 'data@company.com' },
  { id: '5', name: 'DevOps', owner: 'devops@company.com' },
];

export function AssignToTeamDialog({
  open,
  onOpenChange,
  selectedResourceIds,
  onSuccess,
}: AssignToTeamDialogProps) {
  const [selectedTeamId, setSelectedTeamId] = useState<string>('');
  const [teams, setTeams] = useState(MOCK_TEAMS);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset selection when dialog opens
  useEffect(() => {
    if (open) {
      setSelectedTeamId('');
    }
  }, [open]);

  const handleAssign = async () => {
    if (!selectedTeamId && selectedTeamId !== 'unassign') {
      toast.error('Please select a team');
      return;
    }

    setIsSubmitting(true);

    try {
      // In production, call the API
      // await awsResourcesService.bulkAssignToTeam(selectedResourceIds, selectedTeamId === 'unassign' ? null : selectedTeamId);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const selectedTeam = teams.find(t => t.id === selectedTeamId);
      const action = selectedTeamId === 'unassign' ? 'Unassigned' : `Assigned to ${selectedTeam?.name}`;

      toast.success(`${action} successfully`, {
        description: `${selectedResourceIds.length} resource${selectedResourceIds.length !== 1 ? 's' : ''} updated`,
      });

      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      toast.error('Assignment failed', {
        description: error.message || 'Failed to assign resources to team',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedTeam = teams.find(t => t.id === selectedTeamId);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <DialogTitle>Assign to Team</DialogTitle>
              <DialogDescription>
                Assign {selectedResourceIds.length} resource{selectedResourceIds.length !== 1 ? 's' : ''} to a team for cost attribution
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Team Selection */}
          <div className="space-y-2">
            <Label htmlFor="team">Select Team</Label>
            <Select value={selectedTeamId} onValueChange={setSelectedTeamId}>
              <SelectTrigger id="team">
                <SelectValue placeholder="Choose a team..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unassign">
                  <span className="text-muted-foreground">— Unassign (remove team) —</span>
                </SelectItem>
                {teams.map((team) => (
                  <SelectItem key={team.id} value={team.id}>
                    <div className="flex items-center gap-2">
                      <span>{team.name}</span>
                      <span className="text-xs text-muted-foreground">({team.owner})</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Selected Team Info */}
          {selectedTeam && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Resources will be assigned to <strong>{selectedTeam.name}</strong> (owned by {selectedTeam.owner})
              </AlertDescription>
            </Alert>
          )}

          {selectedTeamId === 'unassign' && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Team assignment will be removed. Resources will appear as &quot;Unassigned&quot; in cost reports.
              </AlertDescription>
            </Alert>
          )}

          {/* Resource Summary */}
          <div className="p-4 bg-muted/50 rounded-lg space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Selected Resources:</span>
              <Badge variant="secondary">{selectedResourceIds.length}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Cost attribution and ownership will be updated immediately
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleAssign} disabled={isSubmitting || !selectedTeamId}>
            {isSubmitting ? 'Assigning...' : 'Assign to Team'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
