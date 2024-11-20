"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EnterpriseUsageChart } from "./enterprise-usage-chart";
import { OrganizationUsage } from "./organization-usage";
import { GlobalStats } from "./global-stats";

interface AnalyticsContentProps {
  initialData: any;
}

export function AnalyticsContent({ initialData }: AnalyticsContentProps) {
  return (
    <>
      <GlobalStats stats={initialData.stats} />

      <div className="grid gap-4 grid-cols-1 md:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>API Usage Trends</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <EnterpriseUsageChart data={initialData.usage} />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Organization Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <OrganizationUsage organizations={initialData.organizations} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}