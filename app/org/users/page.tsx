import { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { UserList } from "@/components/shared/users/user-list";
import { notFound } from "next/navigation";
import { getApiUrl } from "@/lib/utils/api-url";

export const dynamic = 'force-dynamic';

export default async function OrganizationUsersPage() {
  try {
    // Get organization ID from session/context in production
    const organizationId = "org_1"; // Hardcoded for demo

    // Fetch organization users
    const response = await fetch(getApiUrl(`organizations/${organizationId}/users`), {
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
            Manage users within your organization
          </p>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <UserList 
            users={initialUsers}
            searchQuery=""
            context="organization"
          />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('Error loading organization users:', error);
    throw error;
  }
}