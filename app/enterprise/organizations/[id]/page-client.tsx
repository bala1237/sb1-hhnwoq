"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrganizationDetails } from "@/components/enterprise/organizations/organization-details";
import { OrganizationApiKeys } from "@/components/enterprise/organizations/organization-api-keys";
import { OrganizationUsers } from "@/components/enterprise/organizations/organization-users";
import { OrganizationUsage } from "@/components/enterprise/organizations/organization-usage";
import { Organization } from "@/lib/api/enterprise/types";
import { useRouter } from "next/navigation";

interface OrganizationDetailsClientProps {
  organization: Organization;
  defaultTab: string;
}

export function OrganizationDetailsClient({ 
  organization,
  defaultTab 
}: OrganizationDetailsClientProps) {
  const router = useRouter();

  const handleTabChange = (tab: string) => {
    // Update URL without full page reload
    router.push(`/enterprise/organizations/${organization.id}?tab=${tab}`, { 
      scroll: false 
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{organization.name}</h3>
        <p className="text-sm text-muted-foreground">
          Manage organization details, API keys, and users
        </p>
      </div>

      <Tabs defaultValue={defaultTab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="usage">Usage & Limits</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <OrganizationDetails organization={organization} />
        </TabsContent>

        <TabsContent value="api-keys">
          <OrganizationApiKeys organization={organization} />
        </TabsContent>

        <TabsContent value="users">
          <OrganizationUsers organization={organization} />
        </TabsContent>

        <TabsContent value="usage">
          <OrganizationUsage organization={organization} />
        </TabsContent>
      </Tabs>
    </div>
  );
}