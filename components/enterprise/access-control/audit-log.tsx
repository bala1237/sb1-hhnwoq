"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const auditLogs = [
  {
    id: "1",
    action: "Role Created",
    actor: "John Doe",
    target: "Support Manager Role",
    timestamp: "2024-02-20 15:30:00",
    status: "success",
  },
  {
    id: "2",
    action: "Policy Modified",
    actor: "Jane Smith",
    target: "API Rate Limiting Policy",
    timestamp: "2024-02-20 14:45:00",
    status: "success",
  },
  {
    id: "3",
    action: "Permission Added",
    actor: "Mike Johnson",
    target: "Security Auditor Role",
    timestamp: "2024-02-20 13:15:00",
    status: "success",
  },
  {
    id: "4",
    action: "Role Deletion Attempted",
    actor: "Alice Brown",
    target: "Custom Role",
    timestamp: "2024-02-20 12:30:00",
    status: "failed",
  },
];

export function AuditLog() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Access Control Audit Log</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Action</TableHead>
              <TableHead>Actor</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auditLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-medium">{log.action}</TableCell>
                <TableCell>{log.actor}</TableCell>
                <TableCell>{log.target}</TableCell>
                <TableCell>{log.timestamp}</TableCell>
                <TableCell>
                  <Badge
                    variant={log.status === "success" ? "default" : "destructive"}
                  >
                    {log.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}