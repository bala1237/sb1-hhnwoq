import { apiClient } from '../../api-client';
import { ApiResponse, AccessPolicy } from './types';

export const accessControlApi = {
  getPolicies: async (params?: {
    type?: string;
    scope?: string;
    status?: string;
  }): Promise<ApiResponse<AccessPolicy[]>> => {
    try {
      const response = await apiClient.get<AccessPolicy[]>('/enterprise/policies', {
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