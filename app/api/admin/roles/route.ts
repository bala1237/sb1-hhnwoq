import { NextResponse } from 'next/server';

const roles = [
  {
    id: "1",
    name: "Enterprise Admin",
    description: "Full access to all enterprise features",
    users: 5,
    lastModified: "2024-02-20",
  },
  {
    id: "2",
    name: "Support Manager",
    description: "Manage support and customer service operations",
    users: 12,
    lastModified: "2024-02-19",
  },
  {
    id: "3",
    name: "Security Auditor",
    description: "Access to security and compliance features",
    users: 3,
    lastModified: "2024-02-18",
  },
];

export async function GET() {
  return NextResponse.json(roles);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newRole = {
      id: `role_${Date.now()}`,
      ...data,
      users: 0,
      lastModified: new Date().toISOString().split('T')[0]
    };
    roles.push(newRole);
    return NextResponse.json(newRole, { status: 201 });
  } catch (error) {
    console.error('Error creating role:', error);
    return NextResponse.json(
      { error: 'Failed to create role' },
      { status: 500 }
    );
  }
}