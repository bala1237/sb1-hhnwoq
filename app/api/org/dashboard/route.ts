import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock dashboard data - in production this would come from your database
    const dashboardData = {
      stats: {
        totalCalls: "2.4M",
        activeKeys: 12,
        teamMembers: 25,
        successRate: "99.9%",
        trendsLastMonth: {
          calls: "+20%",
          keys: "+2",
          members: "+3",
          successRate: "+0.1%"
        }
      },
      usage: [
        { date: "2024-01", calls: 180000 },
        { date: "2024-02", calls: 200000 },
        { date: "2024-03", calls: 250000 },
        { date: "2024-04", calls: 280000 },
        { date: "2024-05", calls: 310000 },
        { date: "2024-06", calls: 350000 },
        { date: "2024-07", calls: 400000 },
      ],
      recentActivity: [
        {
          user: { 
            name: "John Doe", 
            email: "john@acme.com", 
            image: "/avatars/01.png" 
          },
          action: "Generated new API key",
          time: "2 minutes ago"
        },
        {
          user: { 
            name: "Jane Smith", 
            email: "jane@acme.com", 
            image: "/avatars/02.png" 
          },
          action: "Updated rate limits",
          time: "1 hour ago"
        },
        {
          user: { 
            name: "Mike Johnson", 
            email: "mike@acme.com", 
            image: "/avatars/03.png" 
          },
          action: "Added team member",
          time: "3 hours ago"
        },
        {
          user: { 
            name: "Sarah Wilson", 
            email: "sarah@acme.com", 
            image: "/avatars/04.png" 
          },
          action: "Modified webhook settings",
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