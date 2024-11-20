// Analytics data types
interface UsageData {
  date: string;
  totalCalls: number;
  successfulCalls: number;
  failedCalls: number;
  avgLatency: number;
}

interface ErrorData {
  code: string;
  count: number;
  description: string;
  trend: 'up' | 'down' | 'stable';
  percentage: number;
}

interface PerformanceData {
  endpoint: string;
  method: string;
  avgResponseTime: number;
  p95ResponseTime: number;
  successRate: number;
  errorRate: number;
  totalCalls: number;
}

// Mock data
export const analyticsData = {
  usage: {
    '24h': generateHourlyData(24),
    '7d': generateDailyData(7),
    '30d': generateDailyData(30),
    '90d': generateDailyData(90)
  },
  errors: [
    {
      code: '400',
      count: 1245,
      description: 'Bad Request',
      trend: 'down',
      percentage: 45.2
    },
    {
      code: '401',
      count: 834,
      description: 'Unauthorized',
      trend: 'up',
      percentage: 23.4
    },
    {
      code: '403',
      count: 432,
      description: 'Forbidden',
      trend: 'stable',
      percentage: 12.8
    },
    {
      code: '404',
      count: 923,
      description: 'Not Found',
      trend: 'down',
      percentage: 8.6
    },
    {
      code: '429',
      count: 2341,
      description: 'Too Many Requests',
      trend: 'up',
      percentage: 6.2
    },
    {
      code: '500',
      count: 432,
      description: 'Internal Server Error',
      trend: 'down',
      percentage: 3.8
    }
  ],
  performance: [
    {
      endpoint: '/api/v1/users',
      method: 'GET',
      avgResponseTime: 45.2,
      p95ResponseTime: 125.4,
      successRate: 99.8,
      errorRate: 0.2,
      totalCalls: 1250000
    },
    {
      endpoint: '/api/v1/products',
      method: 'POST',
      avgResponseTime: 120.5,
      p95ResponseTime: 350.2,
      successRate: 99.5,
      errorRate: 0.5,
      totalCalls: 850000
    },
    {
      endpoint: '/api/v1/orders',
      method: 'GET',
      avgResponseTime: 65.8,
      p95ResponseTime: 180.3,
      successRate: 99.7,
      errorRate: 0.3,
      totalCalls: 950000
    },
    {
      endpoint: '/api/v1/auth',
      method: 'POST',
      avgResponseTime: 95.3,
      p95ResponseTime: 250.1,
      successRate: 99.6,
      errorRate: 0.4,
      totalCalls: 2500000
    }
  ]
};

// Helper functions to generate time-series data
function generateHourlyData(hours: number): UsageData[] {
  return Array.from({ length: hours }, (_, i) => {
    const date = new Date();
    date.setHours(date.getHours() - (hours - i - 1));
    return {
      date: date.toISOString(),
      totalCalls: Math.floor(Math.random() * 50000) + 10000,
      successfulCalls: Math.floor(Math.random() * 45000) + 9000,
      failedCalls: Math.floor(Math.random() * 5000) + 1000,
      avgLatency: Math.random() * 100 + 50
    };
  });
}

function generateDailyData(days: number): UsageData[] {
  return Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));
    return {
      date: date.toISOString().split('T')[0],
      totalCalls: Math.floor(Math.random() * 1000000) + 200000,
      successfulCalls: Math.floor(Math.random() * 950000) + 190000,
      failedCalls: Math.floor(Math.random() * 50000) + 10000,
      avgLatency: Math.random() * 100 + 50
    };
  });
}
