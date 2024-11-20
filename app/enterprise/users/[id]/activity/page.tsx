import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { UserActivityContent } from "@/components/enterprise/users/user-activity-content";

export const dynamic = 'force-dynamic';

export default async function UserActivityPage({ params }: { params: { id: string } }) {
  // Fetch user activity data
  const response = await fetch(`/api/enterprise/users/${params.id}/activity`);
  const activityData = await response.json();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Activity Log</h3>
        <p className="text-sm text-muted-foreground">
          View user activity history
        </p>
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        <UserActivityContent 
          userId={params.id}
          initialData={activityData}
        />
      </Suspense>
    </div>
  );
}