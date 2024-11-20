"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UsageStats } from "./usage-stats";
import { UsageChart } from "./usage-chart";
import { EndpointUsage } from "./endpoint-usage";
import { ErrorRates } from "./error-rates";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

interface UsageContentProps {
  initialData: any;
  apiKey?: string;
}

export function UsageContent({ initialData, apiKey }: UsageContentProps) {
  const [data, setData] = useState(initialData);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUsageData = async () => {
      if (!apiKey) return;

      try {
        const response = await fetch(`/api/usage?apiKey=${apiKey}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch API key usage data');
        }

        const newData = await response.json();
        setData(newData);
      } catch (error) {
        console.error('Error fetching API key usage:', error);
        toast({
          title: "Error",
          description: "Failed to load API key usage data",
          variant: "destructive"
        });
      }
    };

    fetchUsageData();
  }, [apiKey, toast]);

  return (
    <>
      {apiKey && (
        <Badge variant="outline" className="mb-4">
          Filtered by API Key: {apiKey}
        </Badge>
      )}

      <UsageStats stats={data.stats} />

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Usage Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <UsageChart data={data.timeline} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Endpoints</CardTitle>
          </CardHeader>
          <CardContent>
            <EndpointUsage endpoints={data.endpoints} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Error Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <ErrorRates errors={data.errors} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}