import axios, { AxiosError } from 'axios';

// Support API types
export interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface SupportMessage {
  id: string;
  ticketId: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  timestamp: string;
}

export interface UsageData {
  stats: {
    totalCalls: string;
    avgLatency: string;
    successRate: string;
    errorRate: string;
    trendsLastMonth: {
      calls: string;
      latency: string;
      successRate: string;
      errorRate: string;
    };
  };
  timeline: Array<{
    date: string;
    calls: number;
    errors: number;
  }>;
  endpoints: Array<{
    path: string;
    method: string;
    calls: number;
    latency: string;
    errorRate: string;
    quota: number;
  }>;
  errors: Array<{
    code: string;
    count: number;
    description: string;
  }>;
}

export interface UserSettings {
  personal: {
    fullName: string;
    email: string;
    timezone: string;
    language: string;
    company: string;
    role: string;
  };
  notifications: {
    emailNotifications: boolean;
    apiKeyExpiration: boolean;
    usageAlerts: boolean;
    securityAlerts: boolean;
    maintenanceUpdates: boolean;
    productUpdates: boolean;
    marketingEmails: boolean;
  };
  api: {
    defaultVersion: string;
    webhookUrl: string;
    retryEnabled: boolean;
    maxRetries: string;
    ipWhitelist: string;
    customDomain: string;
  };
}

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error handling helper
const handleApiError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    console.error('API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url
    });
    return error.response?.data?.message || error.message;
  }
  
  if (error instanceof Error) {
    console.error('API Error:', {
      message: error.message,
      name: error.name
    });
    return error.message;
  }
  
  console.error('Unknown API Error');
  return 'An unexpected error occurred';
};

// Support API client
export const supportApi = {
  getTickets: async (): Promise<SupportTicket[]> => {
    try {
      const response = await apiClient.get<SupportTicket[]>('/support/tickets');
      return response.data;
    } catch (error) {
      console.error('Error fetching tickets:', error);
      throw new Error(handleApiError(error));
    }
  },

  getMessages: async (): Promise<SupportMessage[]> => {
    try {
      const response = await apiClient.get<SupportMessage[]>('/support/messages');
      return response.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw new Error(handleApiError(error));
    }
  },

  createTicket: async (data: Partial<SupportTicket>): Promise<SupportTicket> => {
    try {
      const response = await apiClient.post<SupportTicket>('/support/tickets', data);
      return response.data;
    } catch (error) {
      console.error('Error creating ticket:', error);
      throw new Error(handleApiError(error));
    }
  },

  addMessage: async (ticketId: string, content: string): Promise<SupportMessage> => {
    try {
      const response = await apiClient.post<SupportMessage>(`/support/tickets/${ticketId}/messages`, {
        content
      });
      return response.data;
    } catch (error) {
      console.error('Error adding message:', error);
      throw new Error(handleApiError(error));
    }
  }
};

// Usage API client
export const usageApi = {
  getUsageData: async (filters?: { apiKey?: string | null }): Promise<UsageData> => {
    try {
      const response = await apiClient.get<UsageData>('/usage', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching usage data:', error);
      throw new Error(handleApiError(error));
    }
  }
};

// Settings API client
export const settingsApi = {
  getSettings: async (): Promise<UserSettings> => {
    try {
      const response = await apiClient.get<UserSettings>('/settings');
      return response.data;
    } catch (error) {
      console.error('Error fetching settings:', error);
      throw new Error(handleApiError(error));
    }
  },

  updateSettings: async (data: Partial<UserSettings>): Promise<UserSettings> => {
    try {
      const response = await apiClient.put<UserSettings>('/settings', data);
      return response.data;
    } catch (error) {
      console.error('Error updating settings:', error);
      throw new Error(handleApiError(error));
    }
  }
};