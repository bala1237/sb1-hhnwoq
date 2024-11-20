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
    type: "internal",
    fullName: "Jane Smith",
    email: "jane@company.com",
    role: "enterprise_support",
    status: "active",
    permissions: ["support_access"],
    department: "Support",
    lastActive: "5 minutes ago"
  }
];

export async function GET() {
  try {
    // For enterprise users, we only return internal users
    const internalUsers = users.filter(user => user.type === 'internal');
    return NextResponse.json(internalUsers);
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
      type: "internal", // Force internal type for enterprise users
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