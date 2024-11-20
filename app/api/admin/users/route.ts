import { NextResponse } from 'next/server';

// Mock users data - in production this would come from your database
const users = [
  {
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
  {
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
];

export async function GET() {
  try {
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newUser = {
      id: `user_${Date.now()}`,
      status: 'active',
      lastActive: 'Just now',
      ...data
    };

    users.push(newUser);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}