"use client";

import { useEffect, useState, useCallback } from 'react';
import { FeatureFlags, defaultFeatureFlags } from '@/lib/config/feature-flags';
import { useAuth } from '@/lib/hooks/use-auth';

export function useFeatures() {
  const [features, setFeatures] = useState<FeatureFlags>(defaultFeatureFlags);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, organization } = useAuth();

  const fetchFeatures = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/features');
      if (!response.ok) {
        throw new Error('Failed to fetch features');
      }
      const data = await response.json();
      setFeatures(data);
    } catch (err) {
      console.error('Error fetching features:', err);
      setError('Failed to load features');
      // Use default flags as fallback
      setFeatures(defaultFeatureFlags);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeatures();
  }, [fetchFeatures]);

  const checkAccess = useCallback((config: any): boolean => {
    if (!config?.enabled) return false;
    if (!config?.access) return true;

    // Check role access
    if (config.access.roles?.length && !config.access.roles.includes(user?.role)) {
      return false;
    }

    // Check plan access
    if (config.access.plans?.length && !config.access.plans.includes(organization?.plan)) {
      return false;
    }

    return true;
  }, [user?.role, organization?.plan]);

  const isModuleEnabled = useCallback((moduleName: string) => {
    const module = features.modules[moduleName];
    return module ? checkAccess(module) : false;
  }, [features, checkAccess]);

  const isSubmoduleEnabled = useCallback((moduleName: string, submoduleName: string) => {
    const module = features.modules[moduleName];
    const submodule = module?.submodules?.[submoduleName];
    return module && submodule ? checkAccess(module) && checkAccess(submodule) : false;
  }, [features, checkAccess]);

  const isFeatureEnabled = useCallback((featureName: string) => {
    const feature = features.features[featureName];
    return feature ? checkAccess(feature) : false;
  }, [features, checkAccess]);

  const trackFeatureUsage = useCallback(async (featureId: string) => {
    try {
      await fetch('/api/analytics/features', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          featureId,
          userId: user?.id,
          organizationId: organization?.id,
          timestamp: new Date().toISOString()
        })
      });
    } catch (err) {
      console.error('Error tracking feature usage:', err);
    }
  }, [user?.id, organization?.id]);

  return {
    features,
    loading,
    error,
    isModuleEnabled,
    isSubmoduleEnabled,
    isFeatureEnabled,
    trackFeatureUsage
  };
}