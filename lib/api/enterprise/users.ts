import { apiClient } from '../../api-client';
import { ApiResponse, User } from './types';

export const usersApi = {
  getUsers: async (params?: {
    search?: string;
    role?: string;
    status?: string;
    organizationId?: string;
  }): Promise<ApiResponse<User[]>> => {
    try {
      const response = await apiClient.get<User[]>('/api/enterprise/users', { params });
      return { data: Array.isArray(response.data) ? response.data : [], error: null };
    } catch (error) {
      return { data: [], error: handleApiError(error) };
    }
  },

  getUser: async (id: string): Promise<ApiResponse<User>> => {
    try {
      const response = await apiClient.get<User>(`/api/enterprise/users/${id}`);
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: handleApiError(error) };
    }
  },

  updateUser: async (id: string, data: Partial<User>): Promise<ApiResponse<User>> => {
    try {
      const response = await apiClient.put<User>(`/api/enterprise/users/${id}`, data);
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