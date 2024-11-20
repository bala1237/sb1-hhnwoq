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
import { CreatePolicyDialog } from "./create-policy-dialog";

const policies = [
  {
    id: "1",
    name: "API Rate Limiting",
    description: "Controls API request limits per organization",
    type: "System",
    scope: "Global",
    status: "Active",
  },
  {
    id: "2",
    name: "Data Access",
    description: "Defines data access levels for different roles",
    type: "Custom",
    scope: "Organization",
    status: "Active",
  },
  {
    id: "3",
    name: "Audit Logging",
    description: "Specifies which actions are logged",
    type: "System",
    scope: "Global",
    status: "Active",
  },
];

export function PolicyList() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Access Policies</CardTitle>
            <Button onClick={() => setCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Policy
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Policy Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Scope</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {policies.map((policy) => (
                <TableRow key={policy.id}>
                  <TableCell className="font-medium">{policy.name}</TableCell>
                  <TableCell>{policy.description}</TableCell>
                  <TableCell>
                    <Badge variant={policy.type === "System" ? "secondary" : "outline"}>
                      {policy.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{policy.scope}</TableCell>
                  <TableCell>
                    <Badge variant="default">{policy.status}</Badge>
                  </TableCell>
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

      <CreatePolicyDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />
    </>
  );
}