"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const endpoints = [
  {
    path: "/api/v1/users",
    method: "GET",
    calls: 450000,
    latency: "45ms",
    errorRate: "0.02%",
    quota: 75,
  },
  {
    path: "/api/v1/products",
    method: "POST",
    calls: 350000,
    latency: "120ms",
    errorRate: "0.15%",
    quota: 58,
  },
  {
    path: "/api/v1/orders",
    method: "GET",
    calls: 250000,
    latency: "65ms",
    errorRate: "0.08%",
    quota: 42,
  },
  {
    path: "/api/v1/auth",
    method: "POST",
    calls: 150000,
    latency: "95ms",
    errorRate: "0.12%",
    quota: 25,
  },
];

export function EndpointUsage() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Endpoint</TableHead>
          <TableHead>Method</TableHead>
          <TableHead>Calls</TableHead>
          <TableHead>Quota</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {endpoints.map((endpoint) => (
          <TableRow key={`${endpoint.method}-${endpoint.path}`}>
            <TableCell className="font-medium max-w-[200px] truncate">
              {endpoint.path}
            </TableCell>
            <TableCell>
              <Badge variant="outline">{endpoint.method}</Badge>
            </TableCell>
            <TableCell>{endpoint.calls.toLocaleString()}</TableCell>
            <TableCell>
              <div className="space-y-2">
                <Progress value={endpoint.quota} className="h-2" />
                <div className="text-xs text-muted-foreground">
                  {endpoint.quota}% of limit
                </div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}