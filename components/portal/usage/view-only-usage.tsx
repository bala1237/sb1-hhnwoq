"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UsageStats } from "./usage-stats";
import { UsageChart } from "./usage-chart";
import { EndpointUsage } from "./endpoint-usage";
import { ErrorRates } from "./error-rates";

export function ViewOnlyUsage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">API Usage</h3>
        <p className="text-sm text-muted-foreground">
          View API usage and performance metrics
        </p>
      </div>

      <UsageStats />

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Usage Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <UsageChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Endpoints</CardTitle>
          </CardHeader>
          <CardContent>
            <EndpointUsage />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Error Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <ErrorRates />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}