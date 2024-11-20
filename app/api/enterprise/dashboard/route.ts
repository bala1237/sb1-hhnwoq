import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock dashboard data - in production this would come from your database
    const dashboardData = {
      stats: {
        totalOrganizations: 128,
        totalUsers: "45.2K",
        totalApiCalls: "250M",
        errorRate: "0.12%",
        trendsLastMonth: {
          organizations: "+12",
          users: "+5.2K",
          calls: "+28%",
          errorRate: "-0.04%"
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
      organizations: [
        { name: "Acme Corp", usage: 85, limit: 100 },
        { name: "TechStart Inc", usage: 45, limit: 75 },
        { name: "DevCo Labs", usage: 28, limit: 50 },
        { name: "InnoSys", usage: 62, limit: 100 },
        { name: "CloudTech", usage: 15, limit: 25 },
      ],
      recentActivity: [
        {
          user: { 
            name: "John Doe", 
            email: "john@example.com", 
            image: "/avatars/01.png" 
          },
          action: "Created new organization",
          time: "2 minutes ago"
        },
        {
          user: { 
            name: "Jane Smith", 
            email: "jane@example.com", 
            image: "/avatars/02.png" 
          },
          action: "Updated organization plan",
          time: "1 hour ago"
        },
        {
          user: { 
            name: "Mike Johnson", 
            email: "mike@example.com", 
            image: "/avatars/03.png" 
          },
          action: "Added new enterprise user",
          time: "3 hours ago"
        },
        {
          user: { 
            name: "Sarah Wilson", 
            email: "sarah@example.com", 
            image: "/avatars/04.png" 
          },
          action: "Modified access policy",
          time: "5 hours ago"
        }
      ]
    };

    return NextResponse.json(dashboardData);
  } catch (error) {
    console.error('Error fetching enterprise dashboard data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch enterprise dashboard data' },
      { status: 500 }
    );
  }
}