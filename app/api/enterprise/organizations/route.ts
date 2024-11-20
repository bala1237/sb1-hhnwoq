import { NextResponse } from 'next/server';

// Mock organizations data - in production this would come from your database
const organizations = [
  {
    id: "org_1",
    name: "Acme Corp",
    description: "Enterprise software solutions",
    plan: "enterprise",
    status: "active",
    settings: {
      rateLimit: 10000,
      customDomain: "https://api.acme.com"
    },
    contacts: {
      technical: "tech@acme.com",
      billing: "billing@acme.com"
    },
    apiKeys: [],
    createdAt: "2024-01-15T00:00:00.000Z",
    updatedAt: "2024-02-20T00:00:00.000Z"
  },
  {
    id: "org_2",
    name: "TechStart Inc",
    description: "Innovative tech solutions",
    plan: "business",
    status: "active",
    settings: {
      rateLimit: 5000
    },
    contacts: {
      technical: "tech@techstart.com",
      billing: "billing@techstart.com"
    },
    apiKeys: [],
    createdAt: "2024-02-01T00:00:00.000Z",
    updatedAt: "2024-02-19T00:00:00.000Z"
  }
];

export async function GET() {
  try {
    return NextResponse.json(organizations);
  } catch (error) {
    console.error('Error fetching organizations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch organizations' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newOrg = {
      id: `org_${Date.now()}`,
      apiKeys: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active',
      ...data
    };

    organizations.push(newOrg);
    return NextResponse.json(newOrg, { status: 201 });
  } catch (error) {
    console.error('Error creating organization:', error);
    return NextResponse.json(
      { error: 'Failed to create organization' },
      { status: 500 }
    );
  }
}