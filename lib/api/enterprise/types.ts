// Common types used across enterprise modules
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
}

export interface Organization {
  id: string;
  name: string;
  description?: string;
  plan: 'growth' | 'business' | 'enterprise';
  status: 'active' | 'suspended' | 'inactive';
  settings: {
    rateLimit: number;
    customDomain?: string;
  };
  contacts: {
    technical: string;
    billing: string;
  };
  apiKeys: Array<{
    id: string;
    name: string;
    key: string;
    status: 'active' | 'revoked';
    createdAt: string;
    lastUsed: string;
  }>;
  createdAt: string;
  updatedAt: string;
}