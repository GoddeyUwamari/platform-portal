import api, { handleApiResponse } from '../api';
import type {
  Team,
  CreateTeamPayload,
  UpdateTeamPayload,
  Service,
  ApiResponse,
} from '../types';

export const teamsService = {
  // Get all teams
  getAll: async (): Promise<Team[]> => {
    const response = await api.get<ApiResponse<Team[]>>('/api/teams');
    return handleApiResponse(response);
  },

  // Get team by ID
  getById: async (id: string): Promise<Team> => {
    const response = await api.get<ApiResponse<Team>>(`/api/teams/${id}`);
    return handleApiResponse(response);
  },

  // Create team
  create: async (data: CreateTeamPayload): Promise<Team> => {
    const response = await api.post<ApiResponse<Team>>('/api/teams', data);
    return handleApiResponse(response);
  },

  // Update team
  update: async (id: string, data: UpdateTeamPayload): Promise<Team> => {
    const response = await api.put<ApiResponse<Team>>(`/api/teams/${id}`, data);
    return handleApiResponse(response);
  },

  // Delete team
  delete: async (id: string): Promise<void> => {
    const response = await api.delete<ApiResponse<void>>(`/api/teams/${id}`);
    return handleApiResponse(response);
  },

  // Get team's services
  getServices: async (id: string): Promise<Service[]> => {
    const response = await api.get<ApiResponse<Service[]>>(`/api/teams/${id}/services`);
    return handleApiResponse(response);
  },
};
