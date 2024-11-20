"use client";

import { useState, useEffect } from 'react';
import { User, Organization } from '@/lib/types';

// Mock auth data - replace with your actual auth implementation
const mockUser: User = {
  id: 'user_1',
  fullName: 'John Doe',
  email: 'john@example.com',
  role: 'admin',
  status: 'active'
};

const mockOrganization: Organization = {
  id: 'org_1',
  name: 'Acme Corp',
  plan: 'enterprise',
  status: 'active'
};

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        // In production, this would be an API call to get the user and org data
        setUser(mockUser);
        setOrganization(mockOrganization);
      } catch (err) {
        setError('Failed to load auth data');
        console.error('Auth error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthData();
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    // Implement login logic
    console.log('Login:', credentials);
  };

  const logout = async () => {
    // Implement logout logic
    setUser(null);
    setOrganization(null);
  };

  return {
    user,
    organization,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user
  };
}