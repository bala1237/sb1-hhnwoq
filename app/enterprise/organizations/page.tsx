import { Suspense } from "react";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { OrganizationListContent } from "@/components/enterprise/organizations/organization-list-content";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function OrganizationsPage() {
  try {
    // Fetch organizations data
    const response = await fetch('http://localhost:3000/api/enterprise/organizations', {
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
      throw new Error(`Failed to fetch organizations: ${response.statusText}`);
    }

    const initialOrganizations = await response.json();

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Organizations</h3>
          <p className="text-sm text-muted-foreground">
            Manage organizations and their API access
          </p>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <OrganizationListContent initialOrganizations={initialOrganizations} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('Error loading organizations:', error);
    throw error;
  }
}