import { useState, useEffect } from 'react';
import { organizationsApi } from '@/lib/api-client';

export function useOrganizations() {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await organizationsApi.getAll();
        setOrganizations(response.data.data || []);
      } catch (err) {
        console.error('Error fetching organizations:', err);
        setError('Failed to fetch organizations');
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  const createOrganization = async (data: any) => {
    try {
      const response = await organizationsApi.create(data);
      setOrganizations((prev) => [...prev, response.data.data]);
      return response.data.data;
    } catch (err) {
      console.error('Error creating organization:', err);
      throw err;
    }
  };

  const updateOrganization = async (id: string, data: any) => {
    try {
      const response = await organizationsApi.update(id, data);
      setOrganizations((prev) =>
        prev.map((org) => (org._id === id ? response.data.data : org))
      );
      return response.data.data;
    } catch (err) {
      console.error('Error updating organization:', err);
      throw err;
    }
  };

  const deleteOrganization = async (id: string) => {
    try {
      await organizationsApi.delete(id);
      setOrganizations((prev) => prev.filter((org) => org._id !== id));
    } catch (err) {
      console.error('Error deleting organization:', err);
      throw err;
    }
  };

  return {
    organizations,
    loading,
    error,
    createOrganization,
    updateOrganization,
    deleteOrganization,
  };
}