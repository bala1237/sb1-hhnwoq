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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const activities = [
  {
    id: 1,
    action: "Login",
    timestamp: "2024-02-20 14:30:00",
    ip: "192.168.1.1",
    location: "New York, US",
    status: "success",
  },
  {
    id: 2,
    action: "API Key Generated",
    timestamp: "2024-02-20 14:25:00",
    ip: "192.168.1.1",
    location: "New York, US",
    status: "success",
  },
  {
    id: 3,
    action: "Permission Changed",
    timestamp: "2024-02-20 14:20:00",
    ip: "192.168.1.1",
    location: "New York, US",
    status: "success",
  },
  {
    id: 4,
    action: "Failed Login Attempt",
    timestamp: "2024-02-20 14:15:00",
    ip: "192.168.1.2",
    location: "London, UK",
    status: "failed",
  },
];

interface UserActivityContentProps {
  params: {
    id: string;
  };
}

export function UserActivityContent({ params }: UserActivityContentProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">Activity Log</h3>
          <p className="text-sm text-muted-foreground">
            View user activity history
          </p>
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Activities</SelectItem>
            <SelectItem value="login">Login Activities</SelectItem>
            <SelectItem value="api">API Activities</SelectItem>
            <SelectItem value="permission">Permission Changes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Action</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">{activity.action}</TableCell>
                  <TableCell>{activity.timestamp}</TableCell>
                  <TableCell>{activity.ip}</TableCell>
                  <TableCell>{activity.location}</TableCell>
                  <TableCell>
                    <Badge
                      variant={activity.status === "success" ? "default" : "destructive"}
                    >
                      {activity.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}