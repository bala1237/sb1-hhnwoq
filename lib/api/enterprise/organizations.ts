import { apiClient } from '../../api-client';
import { ApiResponse, Organization } from './types';

interface OrganizationFilters {
  search?: string;
  plan?: 'growth' | 'business' | 'enterprise';
  status?: 'active' | 'suspended' | 'inactive';
  createdAfter?: string;
  createdBefore?: string;
}

export const organizationsApi = {
  // Get all organizations with filtering
  getOrganizations: async (filters?: OrganizationFilters): Promise<ApiResponse<Organization[]>> => {
    try {
      const response = await apiClient.get<Organization[]>('/api/enterprise/organizations', {
        params: filters
      });
      return { data: Array.isArray(response.data) ? response.data : [], error: null };
    } catch (error) {
      return { data: [], error: handleApiError(error) };
    }
  },

  // Get a single organization by ID
  getOrganization: async (id: string): Promise<ApiResponse<Organization>> => {
    try {
      const response = await apiClient.get<Organization>(`/api/enterprise/organizations/${id}`);
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: handleApiError(error) };
    }
  },

  // Create a new organization
  createOrganization: async (data: Partial<Organization>): Promise<ApiResponse<Organization>> => {
    try {
      const response = await apiClient.post<Organization>('/api/enterprise/organizations', data);
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: handleApiError(error) };
    }
  },

  // Update an organization
  updateOrganization: async (id: string, data: Partial<Organization>): Promise<ApiResponse<Organization>> => {
    try {
      const response = await apiClient.put<Organization>(`/api/enterprise/organizations/${id}`, data);
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: handleApiError(error) };
    }
  },

  // Update organization plan
  updatePlan: async (id: string, plan: Organization['plan'], rateLimit: number): Promise<ApiResponse<Organization>> => {
    try {
      const response = await apiClient.put<Organization>(`/api/enterprise/organizations/${id}/update-plan`, {
        plan,
        settings: { rateLimit }
      });
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: handleApiError(error) };
    }
  },

  // Reset organization API keys
  resetApiKeys: async (id: string): Promise<ApiResponse<Organization>> => {
    try {
      const response = await apiClient.post<Organization>(`/api/enterprise/organizations/${id}/reset-keys`);
      return { data: response.data, error: null };
    } catch (error) {
      return { data: null, error: handleApiError(error) };
    }
  },

  // Toggle organization status (suspend/activate)
  toggleOrganizationStatus: async (
    id: string,
    status: Organization['status'],
    reason?: string
  ): Promise<ApiResponse<Organization>> => {
    try {
      const response = await apiClient.put<Organization>(`/api/enterprise/organizations/${id}/status`, {
        status,
        reason
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