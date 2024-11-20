import { NextResponse } from 'next/server';

// Mock users data - in production this would come from your database
const organizationUsers = {
  "org_1": [
    {
      id: "1",
      fullName: "John Doe",
      email: "john@acme.com",
      role: "org_admin",
      status: "active",
      lastActive: "2 hours ago"
    },
    {
      id: "2",
      fullName: "Jane Smith",
      email: "jane@acme.com",
      role: "org_developer",
      status: "active",
      lastActive: "5 minutes ago"
    }
  ]
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const users = organizationUsers[params.id] || [];
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching organization users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch organization users' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const newUser = {
      id: `user_${Date.now()}`,
      status: 'active',
      lastActive: 'Just now',
      ...data
    };

    // In production, validate organization exists and user has permissions
    if (!organizationUsers[params.id]) {
      organizationUsers[params.id] = [];
    }

    organizationUsers[params.id].push(newUser);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error creating organization user:', error);
    return NextResponse.json(
      { error: 'Failed to create organization user' },
      { status: 500 }
    );
  }
}