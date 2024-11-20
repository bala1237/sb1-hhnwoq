import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock dashboard data - in production this would come from your database
    const dashboardData = {
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
      overview: [
        { date: "2024-01", calls: 2500 },
        { date: "2024-02", calls: 3500 },
        { date: "2024-03", calls: 4500 },
        { date: "2024-04", calls: 3800 },
        { date: "2024-05", calls: 5000 },
        { date: "2024-06", calls: 4800 },
        { date: "2024-07", calls: 5500 },
      ],
      recentActivity: [
        {
          user: { 
            name: "John Doe", 
            email: "john@example.com", 
            image: "/avatars/01.png" 
          },
          action: "Generated new API key",
          time: "2 minutes ago"
        },
        {
          user: { 
            name: "Jane Smith", 
            email: "jane@example.com", 
            image: "/avatars/02.png" 
          },
          action: "Updated documentation",
          time: "1 hour ago"
        },
        {
          user: { 
            name: "Mike Johnson", 
            email: "mike@example.com", 
            image: "/avatars/03.png" 
          },
          action: "Created new sandbox",
          time: "3 hours ago"
        },
        {
          user: { 
            name: "Sarah Wilson", 
            email: "sarah@example.com", 
            image: "/avatars/04.png" 
          },
          action: "Modified rate limits",
          time: "5 hours ago"
        }
      ]
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}