import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { RolesContent } from "@/components/admin/roles/roles-content";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function RolesPage() {
  try {
    // Fetch roles data
    const response = await fetch('http://localhost:3000/api/admin/roles', {
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
      throw new Error(`Failed to fetch roles: ${response.statusText}`);
    }

    const initialRoles = await response.json();

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Roles</h3>
          <p className="text-sm text-muted-foreground">
            Manage roles and permissions
          </p>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <RolesContent initialRoles={initialRoles} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('Error loading roles:', error);
    throw error;
  }
}