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
import { Plus, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { CreateOrganizationDialog } from "./create-organization-dialog";
import { UpdatePlanDialog } from "./update-plan-dialog";
import { ResetApiKeysDialog } from "./reset-api-keys-dialog";
import { SuspendOrganizationDialog } from "./suspend-organization-dialog";
import { useToast } from "@/components/ui/use-toast";

interface OrganizationListProps {
  initialOrganizations: any[];
}

export function OrganizationList({ initialOrganizations }: OrganizationListProps) {
  const [organizations, setOrganizations] = useState(initialOrganizations);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [updatePlanOpen, setUpdatePlanOpen] = useState(false);
  const [resetKeysOpen, setResetKeysOpen] = useState(false);
  const [suspendOpen, setSuspendOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<any>(null);
  const { toast } = useToast();

  const handleCreateSuccess = (newOrg: any) => {
    setOrganizations(prev => [...prev, newOrg]);
    setCreateDialogOpen(false);
    toast({
      title: "Organization created",
      description: "The organization has been created successfully."
    });
  };

  const handleUpdateSuccess = (updatedOrg: any) => {
    setOrganizations(prev => 
      prev.map(org => org.id === updatedOrg.id ? updatedOrg : org)
    );
    setUpdatePlanOpen(false);
    setSuspendOpen(false);
    setResetKeysOpen(false);
    toast({
      title: "Organization updated",
      description: "The organization has been updated successfully."
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Organizations</CardTitle>
            <Button onClick={() => setCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Organization
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Organization</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>API Rate Limit</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {organizations.map((org) => (
                <TableRow key={org.id}>
                  <TableCell className="font-medium">{org.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{org.plan}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={org.status === "active" ? "default" : "secondary"}
                    >
                      {org.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{org.settings.rateLimit.toLocaleString()} / hour</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link href={`/enterprise/organizations/${org.id}?tab=details`}>
                            View details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/enterprise/organizations/${org.id}?tab=api-keys`}>
                            View API keys
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/enterprise/organizations/${org.id}?tab=users`}>
                            View users
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/enterprise/organizations/${org.id}?tab=usage`}>
                            View usage
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedOrg(org);
                            setUpdatePlanOpen(true);
                          }}
                        >
                          Update plan
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedOrg(org);
                            setResetKeysOpen(true);
                          }}
                        >
                          Reset API keys
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => {
                            setSelectedOrg(org);
                            setSuspendOpen(true);
                          }}
                        >
                          {org.status === "active" ? "Suspend" : "Reactivate"} organization
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CreateOrganizationDialog 
        open={createDialogOpen} 
        onOpenChange={setCreateDialogOpen}
        onSuccess={handleCreateSuccess}
      />

      {selectedOrg && (
        <>
          <UpdatePlanDialog
            open={updatePlanOpen}
            onOpenChange={setUpdatePlanOpen}
            organization={selectedOrg}
            onSuccess={handleUpdateSuccess}
          />
          <ResetApiKeysDialog
            open={resetKeysOpen}
            onOpenChange={setResetKeysOpen}
            organization={selectedOrg}
            onSuccess={handleUpdateSuccess}
          />
          <SuspendOrganizationDialog
            open={suspendOpen}
            onOpenChange={setSuspendOpen}
            organization={selectedOrg}
            onSuccess={handleUpdateSuccess}
          />
        </>
      )}
    </>
  );
}