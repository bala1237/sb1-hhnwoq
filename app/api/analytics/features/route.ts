import { NextResponse } from 'next/server';

// In-memory storage for demo
const featureUsage: any[] = [];

export async function POST(request: Request) {
  const data = await request.json();
  
  // Add usage record
  featureUsage.push({
    ...data,
    id: `usage_${Date.now()}`,
    timestamp: new Date().toISOString()
  });

  return NextResponse.json({ success: true });
}

export async function GET() {
  // Get usage analytics
  const analytics = {
    totalUsage: featureUsage.length,
    byFeature: featureUsage.reduce((acc, record) => {
      acc[record.featureId] = (acc[record.featureId] || 0) + 1;
      return acc;
    }, {}),
    byOrganization: featureUsage.reduce((acc, record) => {
      acc[record.organizationId] = (acc[record.organizationId] || 0) + 1;
      return acc;
    }, {})
  };

  return NextResponse.json(analytics);
}