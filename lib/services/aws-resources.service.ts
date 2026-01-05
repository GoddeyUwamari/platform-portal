import api, { handleApiResponse } from '../api';

export interface ResourceFilters {
  resource_type?: string;
  region?: string;
  status?: string;
  is_encrypted?: boolean;
  is_public?: boolean;
  has_backup?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

export interface AWSResource {
  id: string;
  organization_id: string;
  resource_arn: string;
  resource_id: string;
  resource_name: string | null;
  resource_type: string;
  region: string;
  tags: Record<string, string>;
  metadata: Record<string, any>;
  status: string | null;
  estimated_monthly_cost: number;
  actual_monthly_cost: number;
  is_encrypted: boolean;
  is_public: boolean;
  has_backup: boolean;
  compliance_issues: ComplianceIssue[];
  last_synced_at: string | null;
  first_discovered_at: string;
  created_at: string;
  updated_at: string;

  // Cost Attribution (Migration 011)
  team_id: string | null;
  team_name?: string; // Joined from teams table
  service_id: string | null;
  service_name?: string; // Joined from services table
  environment: string | null;
  owner_email: string | null;
}

export interface ComplianceIssue {
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: string;
  issue: string;
  recommendation: string;
  resource_arn?: string;
}

export interface ResourceStats {
  total_resources: number;
  by_type: Record<string, number>;
  by_region: Record<string, number>;
  by_status: Record<string, number>;
  total_monthly_cost: number;
  cost_by_type: Record<string, number>;
  compliance_stats: {
    total_issues: number;
    by_severity: {
      critical: number;
      high: number;
      medium: number;
      low: number;
    };
    by_category: Record<string, number>;
  };
  orphaned_count: number;
  orphaned_savings: number;
  unencrypted_count: number;
  public_count: number;
  missing_backup_count: number;
}

export const awsResourcesService = {
  /**
   * Get all AWS resources with optional filters
   */
  getAll: async (filters?: ResourceFilters) => {
    const params = new URLSearchParams();

    if (filters) {
      if (filters.resource_type) params.append('resource_type', filters.resource_type);
      if (filters.region) params.append('region', filters.region);
      if (filters.status) params.append('status', filters.status);
      if (filters.is_encrypted !== undefined) params.append('is_encrypted', filters.is_encrypted.toString());
      if (filters.is_public !== undefined) params.append('is_public', filters.is_public.toString());
      if (filters.has_backup !== undefined) params.append('has_backup', filters.has_backup.toString());
      if (filters.search) params.append('search', filters.search);
      if (filters.page) params.append('page', filters.page.toString());
      if (filters.limit) params.append('limit', filters.limit.toString());
    }

    const url = `/api/aws-resources${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await api.get(url);
    return handleApiResponse(response);
  },

  /**
   * Get resource statistics
   */
  getStats: async (): Promise<ResourceStats> => {
    const response = await api.get('/api/aws-resources/stats');
    return handleApiResponse(response);
  },

  /**
   * Get single resource by ID
   */
  getById: async (id: string): Promise<AWSResource> => {
    const response = await api.get(`/api/aws-resources/${id}`);
    return handleApiResponse(response);
  },

  /**
   * Get compliance issues
   */
  getComplianceIssues: async () => {
    const response = await api.get('/api/aws-resources/compliance');
    return handleApiResponse(response);
  },

  /**
   * Get orphaned resources
   */
  getOrphaned: async () => {
    const response = await api.get('/api/aws-resources/orphaned');
    return handleApiResponse(response);
  },

  /**
   * Trigger resource discovery scan
   */
  discover: async () => {
    const response = await api.post('/api/aws-resources/discover');
    return handleApiResponse(response);
  },

  /**
   * Get discovery job history
   */
  getDiscoveryJobs: async (limit: number = 10) => {
    const response = await api.get(`/api/aws-resources/discovery/jobs?limit=${limit}`);
    return handleApiResponse(response);
  },

  /**
   * Delete resource tracking
   */
  deleteTracking: async (id: string): Promise<void> => {
    const response = await api.delete(`/api/aws-resources/${id}`);
    return handleApiResponse(response);
  },

  /**
   * Bulk assign resources to a team
   */
  bulkAssignToTeam: async (resourceIds: string[], teamId: string | null) => {
    const response = await api.post('/api/aws-resources/bulk-assign-team', {
      resourceIds,
      teamId,
    });
    return handleApiResponse(response);
  },

  /**
   * Bulk assign resources to a service
   */
  bulkAssignToService: async (resourceIds: string[], serviceId: string | null) => {
    const response = await api.post('/api/aws-resources/bulk-assign-service', {
      resourceIds,
      serviceId,
    });
    return handleApiResponse(response);
  },

  /**
   * Bulk set environment for resources
   */
  bulkSetEnvironment: async (resourceIds: string[], environment: string | null) => {
    const response = await api.post('/api/aws-resources/bulk-set-environment', {
      resourceIds,
      environment,
    });
    return handleApiResponse(response);
  },

  /**
   * Auto-detect ownership from AWS tags
   */
  autoDetectOwnership: async () => {
    const response = await api.post('/api/aws-resources/auto-detect-ownership');
    return handleApiResponse(response);
  },

  /**
   * Get cost breakdown by team
   */
  getCostByTeam: async () => {
    const response = await api.get('/api/aws-resources/cost-by-team');
    return handleApiResponse(response);
  },

  /**
   * Get cost breakdown by service
   */
  getCostByService: async () => {
    const response = await api.get('/api/aws-resources/cost-by-service');
    return handleApiResponse(response);
  },

  /**
   * Get cost breakdown by environment
   */
  getCostByEnvironment: async () => {
    const response = await api.get('/api/aws-resources/cost-by-environment');
    return handleApiResponse(response);
  },
};
