import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OrganizationDetails } from "@/components/enterprise/organizations/organization-details";
import { OrganizationApiKeys } from "@/components/enterprise/organizations/organization-api-keys";
import { OrganizationUsers } from "@/components/enterprise/organizations/organization-users";
import { OrganizationUsage } from "@/components/enterprise/organizations/organization-usage";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function OrganizationPage({ 
  params,
  searchParams 
}: { 
  params: { id: string };
  searchParams: { tab?: string };
}) {
  try {
    // Fetch organization data
    const response = await fetch(`http://localhost:3000/api/enterprise/organizations/${params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      if (response.status === 404) {
        notFound();
      }
      throw new Error(`Failed to fetch organization: ${response.statusText}`);
    }

    const organization = await response.json();

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">{organization.name}</h3>
          <p className="text-sm text-muted-foreground">
            Manage organization details, API keys, and users
          </p>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue={searchParams.tab || 'details'}>
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
            </CardContent>
          </Card>
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('Error loading organization:', error);
    throw error;
  }
}