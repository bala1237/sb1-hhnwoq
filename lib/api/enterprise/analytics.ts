import { apiClient } from '../../api-client';
import { ApiResponse, AnalyticsData } from './types';

export const analyticsApi = {
  getAnalytics: async (params?: {
    startDate?: string;
    endDate?: string;
    organizationId?: string;
  }): Promise<ApiResponse<AnalyticsData>> => {
    try {
      const response = await apiClient.get<AnalyticsData>('/enterprise/analytics', {
        params
      });
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: handleApiError(error) };
    }
  }
};

function handleApiError(error: any): string {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  return 'An unexpected error occurred';
}