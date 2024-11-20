import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { AccessControlContent } from "@/components/enterprise/access-control/access-control-content";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function AccessControlPage() {
  try {
    // Fetch access control data
    const [rolesResponse, policiesResponse, auditResponse] = await Promise.all([
      fetch('http://localhost:3000/api/enterprise/roles', {
        cache: 'no-store'
      }),
      fetch('http://localhost:3000/api/enterprise/policies', {
        cache: 'no-store'
      }),
      fetch('http://localhost:3000/api/enterprise/audit-logs', {
        cache: 'no-store'
      })
    ]);

    if (!rolesResponse.ok || !policiesResponse.ok || !auditResponse.ok) {
      if (rolesResponse.status === 404 || policiesResponse.status === 404 || auditResponse.status === 404) {
        notFound();
      }
      throw new Error('Failed to fetch access control data');
    }

    const initialData = {
      roles: await rolesResponse.json(),
      policies: await policiesResponse.json(),
      auditLogs: await auditResponse.json()
    };

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Access Control</h3>
          <p className="text-sm text-muted-foreground">
            Manage roles, policies, and access controls across the platform
          </p>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <AccessControlContent initialData={initialData} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('Error loading access control data:', error);
    throw error;
  }
}