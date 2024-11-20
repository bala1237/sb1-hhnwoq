import { User } from "@/lib/types/users";

// Mock data for development
const mockUsers = [
  {
    id: "1",
    type: "internal" as const,
    fullName: "John Doe",
    email: "john@company.com",
    role: "enterprise_admin" as const,
    status: "active" as const,
    permissions: ["full_access"],
    department: "IT",
    lastActive: "2 hours ago"
  },
  {
    id: "2",
    type: "external" as const,
    fullName: "Alice Johnson",
    email: "alice@acme.com",
    role: "org_admin" as const,
    status: "active" as const,
    organizationId: "org_1",
    organizationName: "Acme Corp",
    lastActive: "1 hour ago"
  }
];

export async function getUsers(): Promise<User[]> {
  // In production, this would be a real API call
  if (process.env.NODE_ENV === 'production') {
    try {
      const response = await fetch(`${process.env.API_URL}/admin/users`, {
        next: { revalidate: 60 } // Cache for 1 minute
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }

  // Return mock data in development
  return mockUsers;
}

export async function getUser(id: string): Promise<User | null> {
  // In production, this would be a real API call
  if (process.env.NODE_ENV === 'production') {
    try {
      const response = await fetch(`${process.env.API_URL}/admin/users/${id}`, {
        next: { revalidate: 60 }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }

      return response.json();
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  // Return mock data in development
  return mockUsers.find(user => user.id === id) || null;
}