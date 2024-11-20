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
import { useState, useEffect } from "react";

interface Activity {
  id: string;
  action: string;
  timestamp: string;
  ip: string;
  location: string;
  status: 'success' | 'failed';
}

interface UserActivityProps {
  userId: string;
}

export function UserActivity({ userId }: UserActivityProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated activity data - in production this would be fetched from an API
    const mockActivities: Activity[] = [
      {
        id: '1',
        action: 'Login',
        timestamp: '2024-02-20 14:30:00',
        ip: '192.168.1.1',
        location: 'New York, US',
        status: 'success'
      },
      {
        id: '2',
        action: 'Password Change',
        timestamp: '2024-02-20 14:25:00',
        ip: '192.168.1.1',
        location: 'New York, US',
        status: 'success'
      },
      {
        id: '3',
        action: 'API Key Generated',
        timestamp: '2024-02-20 14:20:00',
        ip: '192.168.1.1',
        location: 'New York, US',
        status: 'success'
      },
      {
        id: '4',
        action: 'Failed Login Attempt',
        timestamp: '2024-02-20 14:15:00',
        ip: '192.168.1.2',
        location: 'London, UK',
        status: 'failed'
      }
    ];

    setTimeout(() => {
      setActivities(mockActivities);
      setLoading(false);
    }, 1000);
  }, [userId]);

  if (loading) {
    return (
      <Card>
        <CardContent className="min-h-[400px] flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Log</CardTitle>
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
  );
}