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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const history = [
  {
    id: 1,
    timestamp: "2024-02-20 15:30:00",
    user: "Admin User",
    action: "Module Enabled",
    details: "Enabled the Analytics module",
    module: "analytics"
  },
  {
    id: 2,
    timestamp: "2024-02-20 14:45:00",
    user: "Admin User",
    action: "Feature Disabled",
    details: "Disabled SSO integration",
    module: "settings"
  },
  {
    id: 3,
    timestamp: "2024-02-20 14:30:00",
    user: "Admin User",
    action: "Submodule Enabled",
    details: "Enabled Chat in Support module",
    module: "support"
  }
];

export function FeatureHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature Change History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Module</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>{entry.timestamp}</TableCell>
                <TableCell>{entry.user}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      entry.action.includes("Enabled")
                        ? "default"
                        : "secondary"
                    }
                  >
                    {entry.action}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {entry.module}
                  </Badge>
                </TableCell>
                <TableCell>{entry.details}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}