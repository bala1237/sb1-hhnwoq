import { NextResponse } from 'next/server';

// Mock analytics data - in production this would come from your database
const analyticsData = {
  stats: {
    totalOrganizations: 128,
    totalUsers: 45200,
    totalApiCalls: "250M",
    errorRate: "0.12%",
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
  ]
};

export async function GET() {
  try {
    return NextResponse.json(analyticsData);
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}