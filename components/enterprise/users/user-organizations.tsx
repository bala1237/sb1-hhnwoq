"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface UserOrganizationsProps {
  userId: string;
}

const organizations = [
  {
    id: "1",
    name: "Acme Corp",
    role: "Admin",
    status: "Active",
    joined: "2024-01-15",
  },
  {
    id: "2",
    name: "TechStart Inc",
    role: "Developer",
    status: "Active",
    joined: "2024-02-01",
  },
  {
    id: "3",
    name: "DevCo Labs",
    role: "Viewer",
    status: "Inactive",
    joined: "2024-02-10",
  },
];

export function UserOrganizations({ userId }: UserOrganizationsProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="mb-4 flex justify-end">
          <Button>Add to Organization</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Organization</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {organizations.map((org) => (
              <TableRow key={org.id}>
                <TableCell className="font-medium">{org.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{org.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={org.status === "Active" ? "default" : "secondary"}
                  >
                    {org.status}
                  </Badge>
                </TableCell>
                <TableCell>{org.joined}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" className="text-destructive">
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}