"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { OrganizationList } from "@/components/enterprise/organizations/organization-list";
import { CreateOrganizationDialog } from "@/components/enterprise/organizations/create-organization-dialog";
import { Organization } from "@/lib/api/enterprise/types";

interface OrganizationsPageClientProps {
  initialOrganizations: Organization[];
}

export function OrganizationsPageClient({ initialOrganizations }: OrganizationsPageClientProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [organizations, setOrganizations] = useState(initialOrganizations);

  const handleCreateSuccess = (newOrg: Organization) => {
    setOrganizations(prev => [...prev, newOrg]);
    setIsCreateDialogOpen(false);
  };

  const handleUpdateSuccess = (updatedOrg: Organization) => {
    setOrganizations(prev => 
      prev.map(org => org.id === updatedOrg.id ? updatedOrg : org)
    );
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <Input
            placeholder="Search organizations..."
            className="h-8 w-[150px] lg:w-[250px]"
          />
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Organization
        </Button>
      </div>

      <OrganizationList 
        organizations={organizations}
        onCreateSuccess={handleCreateSuccess}
        onUpdateSuccess={handleUpdateSuccess}
      />

      <CreateOrganizationDialog 
        open={isCreateDialogOpen} 
        onOpenChange={setIsCreateDialogOpen}
        onSuccess={handleCreateSuccess}
      />
    </>
  );
}