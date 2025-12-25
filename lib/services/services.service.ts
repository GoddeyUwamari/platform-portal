import api, { handleApiResponse } from '../api';
import type {
  Service,
  CreateServicePayload,
  UpdateServicePayload,
  ApiResponse,
} from '../types';

export const servicesService = {
  // Get all services
  getAll: async (): Promise<Service[]> => {
    const response = await api.get<ApiResponse<Service[]>>('/api/services');
    return handleApiResponse(response);
  },

  // Get service by ID
  getById: async (id: string): Promise<Service> => {
    const response = await api.get<ApiResponse<Service>>(`/api/services/${id}`);
    return handleApiResponse(response);
  },

  // Create new service
  create: async (data: CreateServicePayload): Promise<Service> => {
    const response = await api.post<ApiResponse<Service>>('/api/services', data);
    return handleApiResponse(response);
  },

  // Update service
  update: async (id: string, data: UpdateServicePayload): Promise<Service> => {
    const response = await api.put<ApiResponse<Service>>(`/api/services/${id}`, data);
    return handleApiResponse(response);
  },

  // Delete service
  delete: async (id: string): Promise<void> => {
    const response = await api.delete<ApiResponse<void>>(`/api/services/${id}`);
    return handleApiResponse(response);
  },
};
