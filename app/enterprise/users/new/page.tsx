import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { NewUserForm } from "@/components/enterprise/users/new-user-form";

export const dynamic = 'force-dynamic';

export default async function NewUserPage() {
  // Fetch any required data like departments, roles, etc.
  const response = await fetch('/api/enterprise/config/users');
  const config = await response.json();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Add New Enterprise User</h3>
        <p className="text-sm text-muted-foreground">
          Create a new enterprise-level user account
        </p>
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        <NewUserForm config={config} />
      </Suspense>
    </div>
  );
}