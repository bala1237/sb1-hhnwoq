import { useState, useEffect } from 'react';
import { organizationsApi } from '@/lib/api-client';

export function useApiKeys(organizationId: string) {
  const [apiKeys, setApiKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApiKeys = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await organizationsApi.getApiKeys(organizationId);
        setApiKeys(response.data || []);
      } catch (err) {
        console.error('Error fetching API keys:', err);
        setError('Failed to fetch API keys');
      } finally {
        setLoading(false);
      }
    };

    if (organizationId) {
      fetchApiKeys();
    }
  }, [organizationId]);

  const createApiKey = async (data: any) => {
    try {
      const response = await organizationsApi.createApiKey(organizationId, data);
      setApiKeys((prev) => [...prev, response.data]);
      return response.data;
    } catch (err) {
      console.error('Error creating API key:', err);
      throw err;
    }
  };

  const updateApiKey = async (keyId: string, data: any) => {
    try {
      const response = await organizationsApi.updateApiKey(organizationId, keyId, data);
      setApiKeys((prev) =>
        prev.map((key) => (key._id === keyId ? response.data : key))
      );
      return response.data;
    } catch (err) {
      console.error('Error updating API key:', err);
      throw err;
    }
  };

  const deleteApiKey = async (keyId: string) => {
    try {
      await organizationsApi.deleteApiKey(organizationId, keyId);
      setApiKeys((prev) => prev.filter((key) => key._id !== keyId));
    } catch (err) {
      console.error('Error deleting API key:', err);
      throw err;
    }
  };

  return {
    apiKeys,
    loading,
    error,
    createApiKey,
    updateApiKey,
    deleteApiKey,
  };
}