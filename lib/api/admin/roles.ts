import { apiClient } from '../../api-client';

export interface Role {
  id: string;
  name: string;
  description: string;
  users: number;
  lastModified: string;
}

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export const rolesApi = {
  getRoles: async (): Promise<ApiResponse<Role[]>> => {
    try {
      const response = await apiClient.get<Role[]>('/api/admin/roles');
      return { data: Array.isArray(response.data) ? response.data : [], error: null };
    } catch (error) {
      return { data: [], error: handleApiError(error) };
    }
  },

  createRole: async (data: Partial<Role>): Promise<ApiResponse<Role>> => {
    try {
      const response = await apiClient.post<Role>('/api/admin/roles', data);
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: handleApiError(error) };
    }
  },

  updateRole: async (id: string, data: Partial<Role>): Promise<ApiResponse<Role>> => {
    try {
      const response = await apiClient.put<Role>(`/api/admin/roles/${id}`, data);
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: handleApiError(error) };
    }
  },

  deleteRole: async (id: string): Promise<ApiResponse<void>> => {
    try {
      await apiClient.delete(`/api/admin/roles/${id}`);
      return { data: null, error: null };
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