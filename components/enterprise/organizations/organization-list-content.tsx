"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { OrganizationList } from "./organization-list";
import { CreateOrganizationDialog } from "./create-organization-dialog";

interface OrganizationListContentProps {
  initialOrganizations: any[];
}

export function OrganizationListContent({ initialOrganizations }: OrganizationListContentProps) {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  return (
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
        <OrganizationList initialOrganizations={initialOrganizations} />
      </CardContent>

      <CreateOrganizationDialog 
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
    </Card>
  );
}