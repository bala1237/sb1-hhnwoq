import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { UserPermissionsContent } from "@/components/enterprise/users/user-permissions-content";

export const dynamic = 'force-dynamic';

export default async function UserPermissionsPage({ params }: { params: { id: string } }) {
  // Fetch user permissions data
  const [userResponse, rolesResponse] = await Promise.all([
    fetch(`/api/enterprise/users/${params.id}`),
    fetch('/api/enterprise/roles')
  ]);

  const initialData = {
    user: await userResponse.json(),
    availableRoles: await rolesResponse.json()
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">User Permissions</h3>
        <p className="text-sm text-muted-foreground">
          Manage enterprise-level permissions for this user
        </p>
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        <UserPermissionsContent 
          userId={params.id}
          initialData={initialData}
        />
      </Suspense>
    </div>
  );
}