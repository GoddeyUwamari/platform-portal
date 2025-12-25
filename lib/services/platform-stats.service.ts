import api, { handleApiResponse } from '../api';
import type { PlatformDashboardStats, ApiResponse } from '../types';

export const platformStatsService = {
  // Get dashboard statistics
  getDashboardStats: async (): Promise<PlatformDashboardStats> => {
    const response = await api.get<ApiResponse<PlatformDashboardStats>>('/api/platform/stats/dashboard');
    return handleApiResponse(response);
  },
};
