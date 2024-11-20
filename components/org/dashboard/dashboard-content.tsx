"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "@/components/org/overview";
import { RecentActivity } from "@/components/org/recent-activity";
import { DashboardStats } from "@/components/org/dashboard-stats";

interface DashboardContentProps {
  initialData: any;
}

export function DashboardContent({ initialData }: DashboardContentProps) {
  return (
    <>
      <DashboardStats stats={initialData.stats} />
      
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>API Usage Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={initialData.usage} />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentActivity activities={initialData.recentActivity} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}