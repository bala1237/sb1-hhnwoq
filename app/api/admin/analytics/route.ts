import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock analytics data - in production this would come from your database
    const analyticsData = {
      stats: {
        totalUsers: 2543,
        apiCalls: "1.2M",
        activeApiKeys: 342,
        successRate: "99.9%",
        trendsLastMonth: {
          users: "+180",
          calls: "+24%",
          keys: "+18",
          successRate: "+0.1%"
        }
      },
      usage: [
        { date: "2024-01", calls: 2500 },
        { date: "2024-02", calls: 3500 },
        { date: "2024-03", calls: 4500 },
        { date: "2024-04", calls: 3800 },
        { date: "2024-05", calls: 5000 },
        { date: "2024-06", calls: 4800 },
        { date: "2024-07", calls: 5500 },
      ],
      endpoints: [
        {
          path: "/api/v1/users",
          method: "GET",
          latency: "45ms",
          calls: "125,430",
          errors: "0.02%",
        },
        {
          path: "/api/v1/products",
          method: "POST",
          latency: "120ms",
          calls: "84,230",
          errors: "0.15%",
        },
        {
          path: "/api/v1/orders",
          method: "GET",
          latency: "65ms",
          calls: "95,400",
          errors: "0.08%",
        },
        {
          path: "/api/v1/auth",
          method: "POST",
          latency: "95ms",
          calls: "250,180",
          errors: "0.12%",
        },
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

    return NextResponse.json(analyticsData);
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}