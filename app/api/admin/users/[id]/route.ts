import { NextResponse } from 'next/server';

// Mock user data - in production this would come from your database
const users = {
  "1": {
    id: "1",
    type: "internal",
    fullName: "John Doe",
    email: "john@company.com",
    role: "enterprise_admin",
    status: "active",
    permissions: ["full_access"],
    department: "IT",
    lastActive: "2 hours ago"
  },
  "2": {
    id: "2",
    type: "external",
    fullName: "Alice Johnson",
    email: "alice@acme.com",
    role: "org_admin",
    status: "active",
    organizationId: "org_1",
    organizationName: "Acme Corp",
    lastActive: "1 hour ago"
  }
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = users[params.id];

  if (!user) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = users[params.id];
  
  if (!user) {
    return NextResponse.json(
      { error: 'User not found' },
      { status: 404 }
    );
  }

  try {
    const updates = await request.json();
    const updatedUser = {
      ...user,
      ...updates,
      id: params.id // Prevent ID from being changed
    };

    users[params.id] = updatedUser;
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid request data' },
      { status: 400 }
    );
  }
}