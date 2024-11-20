"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const endpoints = [
  {
    path: "/api/v1/users",
    method: "GET",
    latency: "45ms",
    calls: "125,430",
    errors: "0.02%",
  },
  {
    path: "/api/v1/products",
    method: "POST",
    latency: "120ms",
    calls: "84,230",
    errors: "0.15%",
  },
  {
    path: "/api/v1/orders",
    method: "GET",
    latency: "65ms",
    calls: "95,400",
    errors: "0.08%",
  },
  {
    path: "/api/v1/auth",
    method: "POST",
    latency: "95ms",
    calls: "250,180",
    errors: "0.12%",
  },
];

export function EndpointStats() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Endpoint</TableHead>
          <TableHead>Method</TableHead>
          <TableHead>Avg. Latency</TableHead>
          <TableHead>Total Calls</TableHead>
          <TableHead>Error Rate</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {endpoints.map((endpoint) => (
          <TableRow key={`${endpoint.method}-${endpoint.path}`}>
            <TableCell className="font-medium">{endpoint.path}</TableCell>
            <TableCell>{endpoint.method}</TableCell>
            <TableCell>{endpoint.latency}</TableCell>
            <TableCell>{endpoint.calls}</TableCell>
            <TableCell>{endpoint.errors}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}