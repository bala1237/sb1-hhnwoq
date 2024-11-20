import { useState, useEffect } from 'react';
import { analyticsApi } from '@/lib/api-client';

export function useAnalytics(params?: any) {
  const [usageData, setUsageData] = useState(null);
  const [errorData, setErrorData] = useState(null);
  const [performanceData, setPerformanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);

        const [usageResponse, errorsResponse, performanceResponse] = await Promise.all([
          analyticsApi.getUsage(params),
          analyticsApi.getErrors(params),
          analyticsApi.getPerformance(params),
        ]);

        setUsageData(usageResponse.data);
        setErrorData(errorsResponse.data);
        setPerformanceData(performanceResponse.data);
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError('Failed to fetch analytics data');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [params]);

  return {
    usageData,
    errorData,
    performanceData,
    loading,
    error,
  };
}