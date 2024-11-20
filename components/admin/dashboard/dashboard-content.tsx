"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "@/components/admin/overview";
import { RecentActivity } from "@/components/admin/recent-activity";
import { DashboardStats } from "@/components/admin/dashboard-stats";

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
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={initialData.overview} />
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