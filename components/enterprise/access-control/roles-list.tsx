"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Plus } from "lucide-react";
import { CreateRoleDialog } from "./create-role-dialog";

const roles = [
  {
    id: "1",
    name: "Enterprise Admin",
    description: "Full access to all enterprise features",
    users: 5,
    lastModified: "2024-02-20",
  },
  {
    id: "2",
    name: "Support Manager",
    description: "Manage support and customer service operations",
    users: 12,
    lastModified: "2024-02-19",
  },
  {
    id: "3",
    name: "Security Auditor",
    description: "Access to security and compliance features",
    users: 3,
    lastModified: "2024-02-18",
  },
];

export function RolesList() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Custom Roles</CardTitle>
            <Button onClick={() => setCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Role
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell className="font-medium">{role.name}</TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{role.users} users</Badge>
                  </TableCell>
                  <TableCell>{role.lastModified}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" className="px-2">
                      Edit
                    </Button>
                    <Button variant="ghost" className="px-2 text-destructive">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CreateRoleDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />
    </>
  );
}