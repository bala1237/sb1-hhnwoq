"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiUsageChart } from "@/components/admin/api-usage-chart";
import { EndpointStats } from "@/components/admin/endpoint-stats";
import { ErrorRateChart } from "@/components/admin/error-rate-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AnalyticsContentProps {
  initialData: any;
}

export function AnalyticsContent({ initialData }: AnalyticsContentProps) {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
        <TabsTrigger value="errors">Errors</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>API Usage Over Time</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ApiUsageChart data={initialData.usage} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="endpoints" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Endpoint Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <EndpointStats data={initialData.endpoints} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="errors" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Error Rates</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ErrorRateChart data={initialData.errors} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}