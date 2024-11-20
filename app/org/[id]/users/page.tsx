import { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { UserList } from "@/components/shared/users/user-list";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function OrganizationUsersPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  try {
    // Fetch organization users
    const response = await fetch(`http://localhost:3000/api/organizations/${params.id}/users`, {
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
      throw new Error(`Failed to fetch organization users: ${response.statusText}`);
    }

    const initialUsers = await response.json();

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Organization Users</h3>
          <p className="text-sm text-muted-foreground">
            Manage users within this organization
          </p>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <OrganizationUsersContent 
            organizationId={params.id}
            initialUsers={initialUsers}
          />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('Error loading organization users:', error);
    throw error;
  }
}