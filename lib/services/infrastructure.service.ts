import api, { handleApiResponse } from '../api';
import type {
  InfrastructureResource,
  CreateInfrastructurePayload,
  InfrastructureFilters,
  CostMetrics,
  ApiResponse,
} from '../types';

export const infrastructureService = {
  // Get all infrastructure resources with optional filters
  getAll: async (filters?: InfrastructureFilters): Promise<InfrastructureResource[]> => {
    const params = new URLSearchParams();

    if (filters?.serviceId) params.append('serviceId', filters.serviceId);
    if (filters?.resourceType) params.append('resourceType', filters.resourceType);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.awsRegion) params.append('awsRegion', filters.awsRegion);

    const queryString = params.toString();
    const url = `/api/infrastructure${queryString ? `?${queryString}` : ''}`;

    const response = await api.get<ApiResponse<InfrastructureResource[]>>(url);
    return handleApiResponse(response);
  },

  // Get infrastructure resource by ID
  getById: async (id: string): Promise<InfrastructureResource> => {
    const response = await api.get<ApiResponse<InfrastructureResource>>(`/api/infrastructure/${id}`);
    return handleApiResponse(response);
  },

  // Create infrastructure resource (called by CLI)
  create: async (data: CreateInfrastructurePayload): Promise<InfrastructureResource> => {
    const response = await api.post<ApiResponse<InfrastructureResource>>('/api/infrastructure', data);
    return handleApiResponse(response);
  },

  // Get cost metrics
  getCosts: async (): Promise<CostMetrics> => {
    const response = await api.get<ApiResponse<CostMetrics>>('/api/infrastructure/costs');
    return handleApiResponse(response);
  },

  // Get infrastructure for a specific service
  getByService: async (serviceId: string): Promise<InfrastructureResource[]> => {
    return infrastructureService.getAll({ serviceId });
  },
};
