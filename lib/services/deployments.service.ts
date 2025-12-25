import api, { handleApiResponse } from '../api';
import type {
  Deployment,
  CreateDeploymentPayload,
  DeploymentFilters,
  ApiResponse,
} from '../types';

export const deploymentsService = {
  // Get all deployments with optional filters
  getAll: async (filters?: DeploymentFilters): Promise<Deployment[]> => {
    const params = new URLSearchParams();

    if (filters?.serviceId) params.append('serviceId', filters.serviceId);
    if (filters?.environment) params.append('environment', filters.environment);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.startDate) params.append('startDate', filters.startDate);
    if (filters?.endDate) params.append('endDate', filters.endDate);

    const queryString = params.toString();
    const url = `/api/deployments${queryString ? `?${queryString}` : ''}`;

    const response = await api.get<ApiResponse<Deployment[]>>(url);
    return handleApiResponse(response);
  },

  // Get deployment by ID
  getById: async (id: string): Promise<Deployment> => {
    const response = await api.get<ApiResponse<Deployment>>(`/api/deployments/${id}`);
    return handleApiResponse(response);
  },

  // Create deployment (called by CLI)
  create: async (data: CreateDeploymentPayload): Promise<Deployment> => {
    const response = await api.post<ApiResponse<Deployment>>('/api/deployments', data);
    return handleApiResponse(response);
  },

  // Get deployments for a specific service
  getByService: async (serviceId: string): Promise<Deployment[]> => {
    return deploymentsService.getAll({ serviceId });
  },
};
