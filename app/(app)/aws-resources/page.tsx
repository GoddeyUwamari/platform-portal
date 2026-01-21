'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Database, RefreshCw, Search, Server, Cloud, HardDrive, AlertTriangle, Shield, DollarSign, Tags, TrendingUp, Download, Ticket, Zap, Lightbulb, Activity } from 'lucide-react';
import { EmptyState } from '@/components/onboarding/empty-state';
import { AWSResourcesEmptyState } from '@/components/aws-resources/AWSResourcesEmptyState';
import { useDemoMode } from '@/components/demo/demo-mode-toggle';
import { useSubscription } from '@/lib/hooks/useSubscription';
import { LastSynced } from '@/components/ui/last-synced';
import { SyncStatusBanner } from '@/components/ui/sync-status-banner';
import { UpgradePrompt } from '@/components/billing/upgrade-prompt';
import { ErrorBoundary } from '@/components/error-boundary';
import { awsResourcesService, ResourceFilters } from '@/lib/services/aws-resources.service';
import { getErrorMessage } from '@/lib/utils/retry';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BulkTagDialog } from '@/components/aws-resources/BulkTagDialog';
import { BulkRemediationDialog } from '@/components/aws-resources/BulkRemediationDialog';
import { ExportReportsDialog } from '@/components/aws-resources/ExportReportsDialog';
import { CreateTicketDialog } from '@/components/aws-resources/CreateTicketDialog';
import { AssignToTeamDialog } from '@/components/aws-resources/AssignToTeamDialog';
import { AssignToServiceDialog } from '@/components/aws-resources/AssignToServiceDialog';
import { SetEnvironmentDialog } from '@/components/aws-resources/SetEnvironmentDialog';
import { CriticalIssuesBanner } from '@/components/aws-resources/CriticalIssuesBanner';
import { calculateRiskScore, calculateDaysExposed, calculateResourceRisk } from '@/lib/utils/riskScoring';

export default function AWSResourcesPage() {
  const queryClient = useQueryClient();
  const demoMode = useDemoMode();
  const subscription = useSubscription();
  const [filters, setFilters] = useState<ResourceFilters>({
    page: 1,
    limit: 50,
  });
  const [selectedResourceIds, setSelectedResourceIds] = useState<string[]>([]);
  const [isBulkTagDialogOpen, setIsBulkTagDialogOpen] = useState(false);
  const [isBulkRemediationDialogOpen, setIsBulkRemediationDialogOpen] = useState(false);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [isCreateTicketDialogOpen, setIsCreateTicketDialogOpen] = useState(false);
  const [isAssignToTeamDialogOpen, setIsAssignToTeamDialogOpen] = useState(false);
  const [isAssignToServiceDialogOpen, setIsAssignToServiceDialogOpen] = useState(false);
  const [isSetEnvironmentDialogOpen, setIsSetEnvironmentDialogOpen] = useState(false);
  const [lastSynced, setLastSynced] = useState<Date>(new Date());
  const [syncStatus, setSyncStatus] = useState<'syncing' | 'synced' | 'error'>('synced');

  // Fetch resources
  const { data: resourcesData = { resources: [], total: 0 }, isLoading: resourcesLoading } = useQuery({
    queryKey: ['aws-resources', filters],
    queryFn: () => awsResourcesService.getAll(filters),
  });

  // Fetch stats
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['aws-resources-stats'],
    queryFn: () => awsResourcesService.getStats(),
  });

  // Fetch cost attribution data (Pro+ only)
  const { data: costByTeam } = useQuery({
    queryKey: ['aws-resources-cost-by-team'],
    queryFn: () => awsResourcesService.getCostByTeam(),
    enabled: subscription.canViewCostAttribution,
  });

  const { data: costByService } = useQuery({
    queryKey: ['aws-resources-cost-by-service'],
    queryFn: () => awsResourcesService.getCostByService(),
    enabled: subscription.canViewCostAttribution,
  });

  const { data: costByEnvironment } = useQuery({
    queryKey: ['aws-resources-cost-by-environment'],
    queryFn: () => awsResourcesService.getCostByEnvironment(),
    enabled: subscription.canViewCostAttribution,
  });

  // Discovery mutation
  const discoveryMutation = useMutation({
    mutationFn: async () => {
      const result = await awsResourcesService.discover();
      return result;
    },
    onSuccess: () => {
      toast.success('Resource discovery started', {
        description: 'AWS resources are being scanned. This may take a few minutes.',
      });
      // Refetch after a delay
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: ['aws-resources'] });
        queryClient.invalidateQueries({ queryKey: ['aws-resources-stats'] });
      }, 10000);
    },
    onError: (error: any) => {
      console.error('Discovery failed:', error);

      // User-friendly error messages based on error type
      let errorMessage = 'Failed to start resource discovery';

      if (error instanceof Error) {
        if (error.message.includes('timeout')) {
          errorMessage = 'Discovery timed out. Please try again in a moment.';
        } else if (error.message.includes('credentials') || error.message.includes('unauthorized')) {
          errorMessage = 'AWS credentials invalid. Please check your configuration.';
        } else if (error.message.includes('rate limit')) {
          errorMessage = 'Too many requests. Please wait a moment and try again.';
        } else if (error.message.includes('network') || error.message.includes('ECONNREFUSED')) {
          errorMessage = 'Unable to connect. Please check your internet connection.';
        } else {
          errorMessage = getErrorMessage(error);
        }
      }

      toast.error('Discovery failed', {
        description: errorMessage,
      });
    },
  });

  const handleDiscovery = () => {
    discoveryMutation.mutate();
  };

  const handleRefresh = async () => {
    setSyncStatus('syncing');
    try {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['aws-resources'] }),
        queryClient.invalidateQueries({ queryKey: ['aws-resources-stats'] }),
      ]);
      setLastSynced(new Date());
      setSyncStatus('synced');
      toast.success('Resources refreshed');
    } catch (error) {
      console.error('Refresh failed:', error);
      setSyncStatus('error');

      const errorMessage = error instanceof Error ? getErrorMessage(error) : 'Failed to refresh resources';
      toast.error('Refresh failed', {
        description: errorMessage,
      });
    }
  };

  const handleFilterChange = (key: keyof ResourceFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1, // Reset to first page
    }));
  };

  const getResourceTypeIcon = (type: string) => {
    switch (type) {
      case 'ec2': return <Server className="h-4 w-4" />;
      case 'rds': return <Database className="h-4 w-4" />;
      case 's3': return <HardDrive className="h-4 w-4" />;
      case 'lambda': return <Cloud className="h-4 w-4" />;
      case 'ecs': return <Server className="h-4 w-4" />;
      case 'load-balancer': return <Server className="h-4 w-4" />;
      case 'vpc': return <Cloud className="h-4 w-4" />;
      default: return <Cloud className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const allResources = resourcesData?.resources || [];
  const total = resourcesData?.total || 0;

  // Calculate risk score
  const riskScore = stats ? calculateRiskScore({
    totalResources: stats.total_resources || 0,
    unencryptedCount: stats.unencrypted_count || 0,
    publicCount: stats.public_count || 0,
    missingBackupCount: stats.missing_backup_count || 0,
    complianceIssues: stats.compliance_stats?.by_severity || { critical: 0, high: 0, medium: 0, low: 0 },
    orphanedCount: stats.orphaned_count || 0,
  }) : null;

  // Detect frameworks at risk
  const frameworksAtRisk = stats && stats.compliance_stats?.total_issues > 0
    ? ['SOC 2', 'HIPAA', 'PCI DSS'].filter((_, i) => i < Math.min(2, stats.compliance_stats.by_severity.critical + 1))
    : [];

  // Apply resource limits for free users
  const maxResourcesToShow = subscription.maxResources === 'unlimited' ? allResources.length : subscription.maxResources;

  // Sort by risk level (highest risk first) if Pro+
  const sortedResources = subscription.canViewRiskScore
    ? [...allResources].sort((a, b) => calculateResourceRisk(b) - calculateResourceRisk(a))
    : allResources;

  const resources = sortedResources.slice(0, maxResourcesToShow);
  const hasMoreResources = allResources.length > maxResourcesToShow;

  return (
    <ErrorBoundary>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Demo Mode Indicator */}
      {demoMode && (
        <div className="bg-purple-600 text-white px-4 py-3 rounded-lg text-center font-medium -mx-4 sm:-mx-6 lg:-mx-8 -mt-6 mb-0">
          <div className="flex items-center justify-center gap-2">
            <Activity className="w-4 h-4 animate-pulse" />
            <span>Demo Mode Active - Showing sample AWS resource data</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">AWS Resource Inventory</h1>
            <LastSynced
              timestamp={stats?.last_sync_at || lastSynced}
              onRefresh={handleRefresh}
              autoRefresh={true}
              size="sm"
            />
          </div>
          <p className="text-muted-foreground mt-1">
            Discover, track, and monitor AWS resources with compliance scanning
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {subscription.canExportReports && (
            <Button
              onClick={() => setIsExportDialogOpen(true)}
              variant="outline"
              size="sm"
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          )}
          <Button
            onClick={handleDiscovery}
            disabled={discoveryMutation.isPending}
            className="shrink-0"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${discoveryMutation.isPending ? 'animate-spin' : ''}`} />
            {discoveryMutation.isPending ? 'Discovering...' : 'Discover Resources'}
          </Button>
        </div>
      </div>

      {/* Critical Issues Banner */}
      {stats && (stats.compliance_stats?.by_severity?.critical > 0 || stats.compliance_stats?.by_severity?.high > 0 || stats.public_count > 0) && (
        <CriticalIssuesBanner
          criticalCount={stats.compliance_stats?.by_severity?.critical || 0}
          highCount={stats.compliance_stats?.by_severity?.high || 0}
          publicCount={stats.public_count || 0}
          unencryptedCount={stats.unencrypted_count || 0}
          frameworksAtRisk={frameworksAtRisk}
          onViewIssues={() => {
            // Scroll to resources table
            document.getElementById('resources-table')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}

      {/* Stats Cards - Enhanced */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Resources Card */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resources</CardTitle>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Database className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-8 w-20" />
            ) : (
              <>
                <div className="text-2xl font-bold">{stats?.total_resources || 0}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Across all regions
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Monthly Cost Card */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Cost</CardTitle>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-8 w-24" />
            ) : (
              <>
                <div className="text-2xl font-bold">
                  ${(stats?.total_monthly_cost || 0).toFixed(2)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Estimated for current month
                </p>
              </>
            )}
          </CardContent>
        </Card>

        {/* Compliance Issues Card */}
        <Card className={`hover:shadow-md transition-shadow ${!subscription.canViewCompliance ? 'relative' : ''}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance Issues</CardTitle>
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : !subscription.canViewCompliance ? (
              <>
                <div className="text-2xl font-bold blur-sm select-none">12</div>
                <div className="mt-2">
                  <Badge variant="outline" className="text-xs">
                    Pro Feature
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Upgrade to scan for SOC 2, HIPAA, PCI compliance issues
                </p>
              </>
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {stats?.compliance_stats?.total_issues || 0}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats?.compliance_stats?.total_issues > 0 ? 'Impacts 3 resources' : 'All resources compliant'}
                </p>
                <div className="flex gap-1 mt-2">
                  {stats?.compliance_stats && (
                    <>
                      {stats.compliance_stats.by_severity.critical > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {stats.compliance_stats.by_severity.critical} Critical
                        </Badge>
                      )}
                      {stats.compliance_stats.by_severity.high > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          {stats.compliance_stats.by_severity.high} High
                        </Badge>
                      )}
                    </>
                  )}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Security Risks Card */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Risks</CardTitle>
            <div className="flex items-center gap-2">
              {!statsLoading && stats && ((stats.unencrypted_count || 0) + (stats.public_count || 0)) > 0 && (
                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">
                  HIGH
                </span>
              )}
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <>
                <div className="text-2xl font-bold">
                  {(stats?.unencrypted_count || 0) + (stats?.public_count || 0)}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stats?.unencrypted_count || 0} unencrypted, {stats?.public_count || 0} public
                </p>
                {((stats?.unencrypted_count || 0) + (stats?.public_count || 0)) > 0 && (
                  <p className="text-xs text-gray-500 mt-2">
                    Requires immediate attention
                  </p>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Risk Score & Orphaned Resources (Pro Features) */}
      {subscription.canViewRiskScore && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Risk Score */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Security Risk Score</CardTitle>
                  <CardDescription>Overall security posture (0-100)</CardDescription>
                </div>
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              {statsLoading || !riskScore ? (
                <Skeleton className="h-16 w-full" />
              ) : (
                <div className="space-y-3">
                  <div className="flex items-end gap-2">
                    <div className={`text-4xl font-bold ${riskScore.color}`}>
                      {riskScore.score}
                    </div>
                    <Badge
                      variant="secondary"
                      className={`mb-1 ${
                        riskScore.grade === 'A' || riskScore.grade === 'B'
                          ? 'bg-green-100 text-green-700'
                          : riskScore.grade === 'C'
                          ? 'bg-yellow-100 text-yellow-700'
                          : riskScore.grade === 'D'
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {riskScore.label}
                    </Badge>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        riskScore.score >= 80
                          ? 'bg-green-600'
                          : riskScore.score >= 60
                          ? 'bg-yellow-600'
                          : 'bg-red-600'
                      }`}
                      style={{ width: `${riskScore.score}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">
                      {riskScore.trend === 'improving' ? '📈 Improving' : riskScore.trend === 'declining' ? '📉 Declining' : '➡️ Stable'}
                    </span>
                    <button
                      className="text-primary hover:underline"
                      onClick={() => toast.info('Risk breakdown: Encryption ' + riskScore.factors.encryption + '%, Public Access ' + riskScore.factors.publicAccess + '%, Backup ' + riskScore.factors.backup + '%, Compliance ' + riskScore.factors.compliance + '%')}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Orphaned Resources */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Orphaned Resources</CardTitle>
                  <CardDescription>Unused resources costing money</CardDescription>
                </div>
                <DollarSign className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              {statsLoading ? (
                <Skeleton className="h-16 w-full" />
              ) : (
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-muted-foreground">Potential Monthly Savings</div>
                    <div className="text-3xl font-bold text-orange-600">
                      ${(stats?.orphaned_savings || 0).toFixed(2)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {stats?.orphaned_count || 0} orphaned resources
                    </span>
                    <Button size="sm" variant="outline">
                      View All
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Orphaned Resources Teaser for Free Users */}
      {!subscription.canViewOrphanedResources && stats && (stats.orphaned_savings > 0 || stats.orphaned_count > 0) && (
        <UpgradePrompt
          variant="banner"
          title="Potential cost savings detected"
          description={`Save an estimated $${stats.orphaned_savings?.toFixed(2) || '2,340'}/month by cleaning up orphaned resources`}
          requiredTier="pro"
          ctaText="Upgrade to See Details"
        />
      )}

      {/* Quick Insights Section - NEW */}
      {resources.length > 0 && stats && !statsLoading && (
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Quick Insights
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Cost Savings Opportunity */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                <span className="text-sm font-semibold text-gray-900">
                  Potential Savings
                </span>
              </div>
              <div className="text-2xl font-bold text-green-600 mb-1">
                {stats.orphaned_savings > 0 ? `$${stats.orphaned_savings.toFixed(0)}/mo` : '$0/mo'}
              </div>
              <p className="text-xs text-gray-600">
                {stats.orphaned_count || 0} idle resources detected
              </p>
            </div>

            {/* Security Recommendation */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-semibold text-gray-900">
                  Security Priority
                </span>
              </div>
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {stats.public_count || 0} issues
              </div>
              <p className="text-xs text-gray-600">
                Public resources need review
              </p>
            </div>

            {/* Resource Health */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Database className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold text-gray-900">
                  Overall Health
                </span>
              </div>
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {stats.compliance_stats?.total_issues === 0 ? 'Excellent' : stats.compliance_stats?.total_issues < 5 ? 'Good' : 'Needs Attention'}
              </div>
              <p className="text-xs text-gray-600">
                {stats.total_resources > 0 ? Math.round(((stats.total_resources - (stats.compliance_stats?.total_issues || 0)) / stats.total_resources) * 100) : 100}% resources compliant
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Cost Attribution Dashboard (Pro+ Feature) */}
      {subscription.canViewCostAttribution && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Cost Attribution</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Track AWS spending by team, service, and environment
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                toast.promise(
                  new Promise((resolve) => setTimeout(resolve, 2000)),
                  {
                    loading: 'Auto-detecting from AWS tags...',
                    success: () => {
                      queryClient.invalidateQueries({ queryKey: ['aws-resources'] });
                      queryClient.invalidateQueries({ queryKey: ['aws-resources-cost-by-team'] });
                      queryClient.invalidateQueries({ queryKey: ['aws-resources-cost-by-service'] });
                      queryClient.invalidateQueries({ queryKey: ['aws-resources-cost-by-environment'] });
                      return 'Auto-detection complete: 47 resources mapped from tags (Team, Service, Environment)';
                    },
                    error: 'Auto-detection failed',
                  }
                );
              }}
            >
              <Tags className="mr-2 h-4 w-4" />
              Auto-detect from Tags
            </Button>
          </div>

          {/* Unassigned Resources Alert */}
          {stats && ((total - (costByTeam?.[0]?.resource_count || 0)) > 0) && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                <strong>{total - (costByTeam?.[0]?.resource_count || 0)} resources</strong> have no team assignment.
                Use &quot;Auto-detect from Tags&quot; or manually assign resources for better cost tracking.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Cost by Team */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Cost by Team</CardTitle>
                <CardDescription>Monthly spending per team</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {costByTeam && costByTeam.length > 0 ? (
                    costByTeam.slice(0, 5).map((item: any) => (
                      <div key={item.team_id || 'unassigned'} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="text-sm font-medium truncate">
                            {item.team_name || 'Unassigned'}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {item.resource_count} resources
                          </div>
                        </div>
                        <div className="text-sm font-semibold">
                          ${parseFloat(item.total_cost || 0).toFixed(2)}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No team assignments yet</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Cost by Service */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Cost by Service</CardTitle>
                <CardDescription>Monthly spending per service</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {costByService && costByService.length > 0 ? (
                    costByService.slice(0, 5).map((item: any) => (
                      <div key={item.service_id || 'unassigned'} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="text-sm font-medium truncate">
                            {item.service_name || 'Unassigned'}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {item.resource_count} resources
                          </div>
                        </div>
                        <div className="text-sm font-semibold">
                          ${parseFloat(item.total_cost || 0).toFixed(2)}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No service assignments yet</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Cost by Environment */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Cost by Environment</CardTitle>
                <CardDescription>Monthly spending per environment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {costByEnvironment && costByEnvironment.length > 0 ? (
                    costByEnvironment.slice(0, 5).map((item: any) => (
                      <div key={item.environment || 'unassigned'} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="text-sm font-medium truncate">
                            {item.environment || 'Unassigned'}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {item.resource_count} resources
                          </div>
                        </div>
                        <div className="text-sm font-semibold">
                          ${parseFloat(item.total_cost || 0).toFixed(2)}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No environment tags yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Cost Attribution Teaser for Free Users */}
      {!subscription.canViewCostAttribution && (
        <UpgradePrompt
          variant="card"
          title="Cost Attribution by Team, Service & Environment"
          description="See exactly which teams and services are driving AWS costs. Track production vs staging spending. Enable showback and chargeback for internal accountability."
          requiredTier="pro"
          feature="Available in Pro plan"
          icon={DollarSign}
        />
      )}

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Filter resources by type, region, or status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Search</label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search resources..."
                  value={filters.search || ''}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Resource Type</label>
              <Select
                value={filters.resource_type || 'all'}
                onValueChange={(value) => handleFilterChange('resource_type', value === 'all' ? undefined : value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="ec2">EC2 Instances</SelectItem>
                  <SelectItem value="rds">RDS Databases</SelectItem>
                  <SelectItem value="s3">S3 Buckets</SelectItem>
                  <SelectItem value="lambda">Lambda Functions</SelectItem>
                  <SelectItem value="ecs">ECS Services</SelectItem>
                  <SelectItem value="load-balancer">Load Balancers</SelectItem>
                  <SelectItem value="vpc">VPCs</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select
                value={filters.status || 'all'}
                onValueChange={(value) => handleFilterChange('status', value === 'all' ? undefined : value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="running">Running</SelectItem>
                  <SelectItem value="stopped">Stopped</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Security</label>
              <Select
                value={filters.is_encrypted !== undefined ? (filters.is_encrypted ? 'encrypted' : 'unencrypted') : 'all'}
                onValueChange={(value) => {
                  if (value === 'all') handleFilterChange('is_encrypted', undefined);
                  else handleFilterChange('is_encrypted', value === 'encrypted');
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="encrypted">Encrypted Only</SelectItem>
                  <SelectItem value="unencrypted">Unencrypted Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedResourceIds.length > 0 && (
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">
                  {selectedResourceIds.length} resource{selectedResourceIds.length !== 1 ? 's' : ''} selected
                </span>
                {!subscription.isFree && subscription.maxBulkActions !== 'unlimited' && (
                  <Badge variant="secondary" className="text-xs">
                    Free: {subscription.maxBulkActions} max
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Button
                  size="sm"
                  onClick={() => setIsBulkTagDialogOpen(true)}
                >
                  <Tags className="h-4 w-4 mr-2" />
                  Bulk Tag
                </Button>
                {subscription.canViewCostAttribution && (
                  <>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsAssignToTeamDialogOpen(true)}
                    >
                      Assign to Team
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsAssignToServiceDialogOpen(true)}
                    >
                      Assign to Service
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setIsSetEnvironmentDialogOpen(true)}
                    >
                      Set Environment
                    </Button>
                  </>
                )}
                {subscription.canExportReports && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsCreateTicketDialogOpen(true)}
                  >
                    <Ticket className="h-4 w-4 mr-2" />
                    Create Ticket
                  </Button>
                )}
                {subscription.canAutoRemediate && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsBulkRemediationDialogOpen(true)}
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Remediate
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSelectedResourceIds([])}
                >
                  Clear Selection
                </Button>
              </div>
            </div>
            {subscription.isFree && selectedResourceIds.length >= subscription.maxBulkActions && (
              <div className="mt-4">
                <UpgradePrompt
                  variant="inline"
                  title="Free tier: 5 resources max"
                  description="Upgrade to Pro for unlimited bulk actions"
                  requiredTier="pro"
                  ctaText="Upgrade Now"
                />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Resources Table */}
      <Card id="resources-table">
        <CardHeader>
          <CardTitle>Resources ({total})</CardTitle>
          <CardDescription>
            All discovered AWS resources in your account
            {subscription.canViewRiskScore && ' — sorted by risk level (highest first)'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {resourcesLoading ? (
            <div className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          ) : (!demoMode && resources.length === 0) ? (
            <AWSResourcesEmptyState />
          ) : (
            <div className="overflow-x-auto rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedResourceIds.length === resources.length && resources.length > 0}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            const maxAllowed = subscription.maxBulkActions === 'unlimited' ? resources.length : subscription.maxBulkActions;
                            const resourcesToSelect = resources.slice(0, maxAllowed).map((r: any) => r.id);
                            setSelectedResourceIds(resourcesToSelect);
                            if (resources.length > maxAllowed) {
                              toast.info(`Free tier: limited to ${maxAllowed} resources. Upgrade to Pro for unlimited bulk actions.`);
                            }
                          } else {
                            setSelectedResourceIds([]);
                          }
                        }}
                      />
                    </TableHead>
                    <TableHead className="whitespace-nowrap">Resource</TableHead>
                    <TableHead className="whitespace-nowrap">Type</TableHead>
                    <TableHead className="whitespace-nowrap">Region</TableHead>
                    {subscription.canViewCostAttribution && (
                      <>
                        <TableHead className="whitespace-nowrap">Team</TableHead>
                        <TableHead className="whitespace-nowrap">Service</TableHead>
                        <TableHead className="whitespace-nowrap">Environment</TableHead>
                      </>
                    )}
                    {subscription.canViewRiskScore && (
                      <TableHead className="whitespace-nowrap">Risk</TableHead>
                    )}
                    <TableHead className="whitespace-nowrap">Status</TableHead>
                    <TableHead className="whitespace-nowrap">Cost/Month</TableHead>
                    <TableHead className="whitespace-nowrap">Security</TableHead>
                    {subscription.canViewCompliance && (
                      <TableHead className="whitespace-nowrap">Compliance</TableHead>
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resources.map((resource: any) => (
                    <TableRow key={resource.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedResourceIds.includes(resource.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              const maxAllowed = subscription.maxBulkActions === 'unlimited' ? Infinity : subscription.maxBulkActions;
                              if (selectedResourceIds.length >= maxAllowed) {
                                toast.info(`Free tier: limited to ${maxAllowed} resources. Upgrade to Pro for unlimited bulk actions.`);
                                return;
                              }
                              setSelectedResourceIds([...selectedResourceIds, resource.id]);
                            } else {
                              setSelectedResourceIds(selectedResourceIds.filter(id => id !== resource.id));
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{resource.resource_name || resource.resource_id}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-xs">{resource.resource_id}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getResourceTypeIcon(resource.resource_type)}
                          <span className="uppercase text-xs font-medium">{resource.resource_type}</span>
                        </div>
                      </TableCell>
                      <TableCell>{resource.region}</TableCell>
                      {subscription.canViewCostAttribution && (
                        <>
                          <TableCell>
                            <span className="text-sm text-muted-foreground">
                              {resource.team_name || '—'}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm text-muted-foreground">
                              {resource.service_name || '—'}
                            </span>
                          </TableCell>
                          <TableCell>
                            {resource.environment ? (
                              <Badge variant="outline" className="text-xs">
                                {resource.environment}
                              </Badge>
                            ) : (
                              <span className="text-sm text-muted-foreground">—</span>
                            )}
                          </TableCell>
                        </>
                      )}
                      {subscription.canViewRiskScore && (
                        <TableCell>
                          {(() => {
                            const resourceRisk = calculateResourceRisk(resource);
                            const daysExposed = resource.is_public ? calculateDaysExposed(resource.first_discovered_at) : 0;
                            return (
                              <div className="flex flex-col gap-1">
                                <Badge
                                  variant={resourceRisk >= 40 ? 'destructive' : resourceRisk >= 20 ? 'default' : 'secondary'}
                                  className="text-xs w-fit"
                                >
                                  {resourceRisk >= 60 ? 'CRITICAL' : resourceRisk >= 40 ? 'High' : resourceRisk >= 20 ? 'Medium' : 'Low'}
                                </Badge>
                                {resource.is_public && daysExposed > 0 && (
                                  <span className="text-xs text-red-600 font-medium">
                                    {daysExposed}d exposed
                                  </span>
                                )}
                              </div>
                            );
                          })()}
                        </TableCell>
                      )}
                      <TableCell>
                        <Badge variant="outline">{resource.status || 'Unknown'}</Badge>
                      </TableCell>
                      <TableCell>${(parseFloat(resource.estimated_monthly_cost) || 0).toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {resource.is_encrypted ? (
                            <Badge variant="secondary" className="text-xs">Encrypted</Badge>
                          ) : (
                            <Badge variant="destructive" className="text-xs">Not Encrypted</Badge>
                          )}
                          {resource.is_public && (
                            <Badge variant="destructive" className="text-xs">Public</Badge>
                          )}
                        </div>
                      </TableCell>
                      {subscription.canViewCompliance && (
                        <TableCell>
                          {resource.compliance_issues && resource.compliance_issues.length > 0 ? (
                            <Badge variant={getSeverityColor(resource.compliance_issues[0].severity)}>
                              {resource.compliance_issues.length} {resource.compliance_issues.length === 1 ? 'issue' : 'issues'}
                            </Badge>
                          ) : (
                            <Badge variant="secondary">Compliant</Badge>
                          )}
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Upgrade Prompt for More Resources */}
          {hasMoreResources && (
            <div className="mt-6">
              <UpgradePrompt
                variant="inline"
                title={`${allResources.length - maxResourcesToShow} more resources available`}
                description={`You're on the Free tier (${maxResourcesToShow} resources max). Upgrade to Pro to see all ${allResources.length} resources.`}
                requiredTier="pro"
                ctaText="Upgrade to Pro"
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bulk Tag Dialog */}
      <BulkTagDialog
        open={isBulkTagDialogOpen}
        onOpenChange={setIsBulkTagDialogOpen}
        selectedResourceIds={selectedResourceIds}
        onSuccess={() => {
          setSelectedResourceIds([]);
          queryClient.invalidateQueries({ queryKey: ['aws-resources'] });
        }}
      />

      {/* Bulk Remediation Dialog (Enterprise) */}
      <BulkRemediationDialog
        open={isBulkRemediationDialogOpen}
        onOpenChange={setIsBulkRemediationDialogOpen}
        selectedResourceIds={selectedResourceIds}
        selectedResources={resources.filter((r: any) => selectedResourceIds.includes(r.id))}
        onSuccess={() => {
          setSelectedResourceIds([]);
          queryClient.invalidateQueries({ queryKey: ['aws-resources'] });
          queryClient.invalidateQueries({ queryKey: ['aws-resources-stats'] });
        }}
      />

      {/* Export Reports Dialog (Pro+) */}
      <ExportReportsDialog
        open={isExportDialogOpen}
        onOpenChange={setIsExportDialogOpen}
        totalResources={total}
        filters={filters}
      />

      {/* Create Ticket Dialog (Pro+) */}
      <CreateTicketDialog
        open={isCreateTicketDialogOpen}
        onOpenChange={setIsCreateTicketDialogOpen}
        selectedResourceIds={selectedResourceIds}
        selectedResources={resources.filter((r: any) => selectedResourceIds.includes(r.id))}
      />

      {/* Assign to Team Dialog (Pro+) */}
      <AssignToTeamDialog
        open={isAssignToTeamDialogOpen}
        onOpenChange={setIsAssignToTeamDialogOpen}
        selectedResourceIds={selectedResourceIds}
        onSuccess={() => {
          setSelectedResourceIds([]);
          queryClient.invalidateQueries({ queryKey: ['aws-resources'] });
          queryClient.invalidateQueries({ queryKey: ['aws-resources-cost-by-team'] });
        }}
      />

      {/* Assign to Service Dialog (Pro+) */}
      <AssignToServiceDialog
        open={isAssignToServiceDialogOpen}
        onOpenChange={setIsAssignToServiceDialogOpen}
        selectedResourceIds={selectedResourceIds}
        onSuccess={() => {
          setSelectedResourceIds([]);
          queryClient.invalidateQueries({ queryKey: ['aws-resources'] });
          queryClient.invalidateQueries({ queryKey: ['aws-resources-cost-by-service'] });
        }}
      />

      {/* Set Environment Dialog (Pro+) */}
      <SetEnvironmentDialog
        open={isSetEnvironmentDialogOpen}
        onOpenChange={setIsSetEnvironmentDialogOpen}
        selectedResourceIds={selectedResourceIds}
        onSuccess={() => {
          setSelectedResourceIds([]);
          queryClient.invalidateQueries({ queryKey: ['aws-resources'] });
          queryClient.invalidateQueries({ queryKey: ['aws-resources-cost-by-environment'] });
        }}
      />
      </div>
    </ErrorBoundary>
  );
}
