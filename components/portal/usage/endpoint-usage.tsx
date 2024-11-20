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

interface EndpointUsageProps {
  endpoints: Array<{
    path: string;
    method: string;
    calls: number;
    latency: string;
    errorRate: string;
    quota: number;
  }>;
}

export function EndpointUsage({ endpoints }: EndpointUsageProps) {
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