import { NextResponse } from 'next/server';

export async function GET() {
  const categories = [
    {
      id: "authentication",
      name: "Authentication",
      description: "API authentication and authorization endpoints",
      endpoints: ["auth-token", "auth-refresh"]
    },
    {
      id: "users",
      name: "Users",
      description: "User management endpoints",
      endpoints: ["users-list", "users-create", "users-get", "users-update", "users-delete"]
    }
  ];

  return NextResponse.json(categories);
}