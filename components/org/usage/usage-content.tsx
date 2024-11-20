"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UsageStats } from "./usage-stats";
import { UsageChart } from "./usage-chart";
import { EndpointUsage } from "./endpoint-usage";
import { ErrorRates } from "./error-rates";

interface UsageContentProps {
  initialData: any;
}

export function UsageContent({ initialData }: UsageContentProps) {
  return (
    <>
      <UsageStats stats={initialData.stats} />

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Usage Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <UsageChart data={initialData.timeline} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Endpoints</CardTitle>
          </CardHeader>
          <CardContent>
            <EndpointUsage endpoints={initialData.endpoints} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Error Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <ErrorRates errors={initialData.errors} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}