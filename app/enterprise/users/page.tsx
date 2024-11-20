import { Suspense } from "react";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { notFound } from "next/navigation";
import { EnterpriseUserContent } from "@/components/enterprise/users/enterprise-user-content";

export const dynamic = 'force-dynamic';

export default async function EnterpriseUsersPage() {
  try {
    // Fetch users data
    const response = await fetch('http://localhost:3000/api/enterprise/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      if (response.status === 404) {
        notFound();
      }
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }

    const initialUsers = await response.json();

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Enterprise Users</h3>
          <p className="text-sm text-muted-foreground">
            Manage internal enterprise users
          </p>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <EnterpriseUserContent initialUsers={initialUsers} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('Error loading users:', error);
    throw error;
  }
}