"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Clock, Zap, AlertTriangle } from "lucide-react";

interface UsageStatsProps {
  stats: {
    totalCalls: string;
    avgLatency: string;
    successRate: string;
    errorRate: string;
    trendsLastMonth: {
      calls: string;
      latency: string;
      successRate: string;
      errorRate: string;
    };
  };
}

export function UsageStats({ stats }: UsageStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total API Calls</CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalCalls}</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <span className="text-green-500 mr-1">{stats.trendsLastMonth.calls}</span>
            vs last month
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Latency</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.avgLatency}</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <span className="text-green-500 mr-1">{stats.trendsLastMonth.latency}</span>
            vs last month
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          <Zap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.successRate}</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <span className="text-green-500 mr-1">{stats.trendsLastMonth.successRate}</span>
            vs last month
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.errorRate}</div>
          <div className="flex items-center text-xs text-muted-foreground">
            <span className="text-red-500 mr-1">{stats.trendsLastMonth.errorRate}</span>
            vs last month
          </div>
        </CardContent>
      </Card>
    </div>
  );
}