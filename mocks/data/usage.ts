export const usageData = {
  stats: {
    totalCalls: "2.4M",
    avgLatency: "45ms",
    successRate: "99.9%",
    errorRate: "0.1%",
    trendsLastMonth: {
      calls: "↑20%",
      latency: "↓8%",
      successRate: "↑0.2%",
      errorRate: "↓0.02%"
    }
  },
  timeline: [
    { date: "2024-02-14", calls: 180000, errors: 180 },
    { date: "2024-02-15", calls: 200000, errors: 200 },
    { date: "2024-02-16", calls: 250000, errors: 250 },
    { date: "2024-02-17", calls: 280000, errors: 280 },
    { date: "2024-02-18", calls: 310000, errors: 310 },
    { date: "2024-02-19", calls: 350000, errors: 350 },
    { date: "2024-02-20", calls: 400000, errors: 400 }
  ],
  endpoints: [
    {
      path: "/api/v1/users",
      method: "GET",
      calls: 450000,
      latency: "45ms",
      errorRate: "0.02%",
      quota: 75
    },
    {
      path: "/api/v1/products",
      method: "POST",
      calls: 350000,
      latency: "120ms",
      errorRate: "0.15%",
      quota: 58
    },
    {
      path: "/api/v1/orders",
      method: "GET",
      calls: 250000,
      latency: "65ms",
      errorRate: "0.08%",
      quota: 42
    }
  ],
  errors: [
    { code: "400", count: 145, description: "Bad Request" },
    { code: "401", count: 234, description: "Unauthorized" },
    { code: "403", count: 84, description: "Forbidden" },
    { code: "404", count: 383, description: "Not Found" },
    { code: "429", count: 475, description: "Too Many Requests" },
    { code: "500", count: 176, description: "Internal Server Error" }
  ]
};