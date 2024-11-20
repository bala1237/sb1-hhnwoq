import { apiClient } from '../../api-client';
import { ApiResponse, EnterpriseSettings } from './types';

export const settingsApi = {
  getSettings: async (): Promise<ApiResponse<EnterpriseSettings>> => {
    try {
      const response = await apiClient.get<EnterpriseSettings>('/enterprise/settings');
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: handleApiError(error) };
    }
  },

  updateSettings: async (data: Partial<EnterpriseSettings>): Promise<ApiResponse<EnterpriseSettings>> => {
    try {
      const response = await apiClient.put<EnterpriseSettings>('/enterprise/settings', data);
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