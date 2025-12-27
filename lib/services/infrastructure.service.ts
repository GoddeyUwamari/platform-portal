import api, { handleApiResponse } from '../api';
import type {
  InfrastructureResource,
  CreateInfrastructurePayload,
  InfrastructureFilters,
  ApiResponse,
} from '../types';

export const infrastructureService = {
  // Get all infrastructure resources with optional filters
  getAll: async (filters?: InfrastructureFilters): Promise<InfrastructureResource[]> => {
    const params = new URLSearchParams();
    if (filters?.serviceId) params.append('service_id', filters.serviceId);
    if (filters?.resourceType) params.append('resource_type', filters.resourceType);
    if (filters?.status) params.append('status', filters.status);
    
    const queryString = params.toString() ? `?${params.toString()}` : '';
    const response = await api.get<ApiResponse<any>>(`/api/infrastructure${queryString}`);
    const result = handleApiResponse(response);
    
    // Transform backend snake_case to frontend camelCase
    return (result || []).map((r: any) => ({
      id: r.id,
      serviceId: r.service_id,
      serviceName: r.service_name,
      resourceType: r.resource_type,
      awsId: r.aws_id,
      awsRegion: r.aws_region,
      status: r.status,
      costPerMonth: parseFloat(r.cost_per_month) || 0,
      metadata: r.metadata,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    }));
  },

  // Get cost breakdown
  getCosts: async () => {
    const response = await api.get<ApiResponse<any>>('/api/infrastructure/costs');
    return handleApiResponse(response);
  },

  // Create new infrastructure resource
  create: async (payload: CreateInfrastructurePayload): Promise<InfrastructureResource> => {
    const response = await api.post<ApiResponse<any>>('/api/infrastructure', payload);
    const r = handleApiResponse(response);
    
    return {
      id: r.id,
      serviceId: r.service_id,
      serviceName: r.service_name,
      resourceType: r.resource_type,
      awsId: r.aws_id,
      awsRegion: r.aws_region,
      status: r.status,
      costPerMonth: parseFloat(r.cost_per_month) || 0,
      metadata: r.metadata,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
    };
  },

  // Delete infrastructure resource
  delete: async (id: string): Promise<void> => {
    await api.delete(`/api/infrastructure/${id}`);
  },

  // Sync AWS resources
  syncAWS: async (): Promise<any> => {
    const response = await api.post<ApiResponse<any>>('/api/infrastructure/sync-aws');
    return handleApiResponse(response);
  },
};