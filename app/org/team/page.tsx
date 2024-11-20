import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { TeamContent } from "@/components/org/team/team-content";

export const dynamic = 'force-dynamic';

export default async function TeamPage() {
  // Fetch team data
  const response = await fetch('/api/org/team');
  const initialTeam = await response.json();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Team Members</h3>
        <p className="text-sm text-muted-foreground">
          Manage your team members and their roles
        </p>
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        <TeamContent initialTeam={initialTeam} />
      </Suspense>
    </div>
  );
}