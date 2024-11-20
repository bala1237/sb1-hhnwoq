"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnterpriseGeneralSettings } from "./enterprise-general-settings";
import { EnterpriseApiSettings } from "./enterprise-api-settings";
import { EnterpriseSecuritySettings } from "./enterprise-security-settings";

interface EnterpriseSettingsContentProps {
  initialSettings: any;
}

export function EnterpriseSettingsContent({ initialSettings }: EnterpriseSettingsContentProps) {
  return (
    <Tabs defaultValue="general" className="space-y-4">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="api">API Configuration</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <EnterpriseGeneralSettings settings={initialSettings.general} />
      </TabsContent>

      <TabsContent value="api">
        <EnterpriseApiSettings settings={initialSettings.api} />
      </TabsContent>

      <TabsContent value="security">
        <EnterpriseSecuritySettings settings={initialSettings.security} />
      </TabsContent>
    </Tabs>
  );
}