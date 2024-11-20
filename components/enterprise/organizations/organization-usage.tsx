"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const usageData = [
  { date: "2024-01", calls: 850000 },
  { date: "2024-02", calls: 920000 },
  { date: "2024-03", calls: 880000 },
  { date: "2024-04", calls: 950000 },
  { date: "2024-05", calls: 1020000 },
  { date: "2024-06", calls: 980000 },
];

const limits = {
  apiCalls: {
    used: 980000,
    total: 1000000,
    percentage: 98,
  },
  storage: {
    used: 450,
    total: 500,
    percentage: 90,
  },
  bandwidth: {
    used: 800,
    total: 1000,
    percentage: 80,
  },
};

export function OrganizationUsage() {
  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>API Usage Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="calls"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resource Usage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">API Calls</p>
                <p className="text-sm text-muted-foreground">
                  {limits.apiCalls.used.toLocaleString()} /{" "}
                  {limits.apiCalls.total.toLocaleString()} calls
                </p>
              </div>
              <span className="text-sm text-muted-foreground">
                {limits.apiCalls.percentage}%
              </span>
            </div>
            <Progress value={limits.apiCalls.percentage} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Storage</p>
                <p className="text-sm text-muted-foreground">
                  {limits.storage.used} / {limits.storage.total} GB
                </p>
              </div>
              <span className="text-sm text-muted-foreground">
                {limits.storage.percentage}%
              </span>
            </div>
            <Progress value={limits.storage.percentage} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Bandwidth</p>
                <p className="text-sm text-muted-foreground">
                  {limits.bandwidth.used} / {limits.bandwidth.total} GB
                </p>
              </div>
              <span className="text-sm text-muted-foreground">
                {limits.bandwidth.percentage}%
              </span>
            </div>
            <Progress value={limits.bandwidth.percentage} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}