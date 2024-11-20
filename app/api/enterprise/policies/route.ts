import { NextResponse } from 'next/server';

// Mock policies data - in production this would come from your database
const policies = [
  {
    id: "1",
    name: "API Rate Limiting",
    description: "Controls API request limits per organization",
    type: "System",
    scope: "Global",
    status: "Active",
  },
  {
    id: "2",
    name: "Data Access",
    description: "Defines data access levels for different roles",
    type: "Custom",
    scope: "Organization",
    status: "Active",
  },
  {
    id: "3",
    name: "Audit Logging",
    description: "Specifies which actions are logged",
    type: "System",
    scope: "Global",
    status: "Active",
  },
];

export async function GET() {
  try {
    return NextResponse.json(policies);
  } catch (error) {
    console.error('Error fetching policies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch policies' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newPolicy = {
      id: `policy_${Date.now()}`,
      status: 'Active',
      ...data
    };

    policies.push(newPolicy);
    return NextResponse.json(newPolicy, { status: 201 });
  } catch (error) {
    console.error('Error creating policy:', error);
    return NextResponse.json(
      { error: 'Failed to create policy' },
      { status: 500 }
    );
  }
}