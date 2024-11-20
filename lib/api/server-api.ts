import { headers } from 'next/headers';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api/portal';

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const headersList = headers();
  const authToken = headersList.get('authorization');

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(authToken ? { Authorization: authToken } : {}),
      ...options.headers,
    },
    cache: 'no-store'
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export const serverApi = {
  // API Keys
  getApiKeys: () => fetchWithAuth('/api-keys'),
  
  // Settings
  getSettings: () => fetchWithAuth('/settings'),
  
  // Sandbox
  getSandboxConfig: () => fetchWithAuth('/sandbox/config'),
  
  // Usage
  getUsageData: (filters?: Record<string, string>) => {
    const queryString = filters ? `?${new URLSearchParams(filters)}` : '';
    return fetchWithAuth(`/usage${queryString}`);
  }
};