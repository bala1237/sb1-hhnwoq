"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneralSettings } from "./general-settings";
import { ApiSettings } from "./api-settings";
import { SecuritySettings } from "./security-settings";

interface SettingsContentProps {
  initialSettings: any;
}

export function SettingsContent({ initialSettings }: SettingsContentProps) {
  return (
    <Tabs defaultValue="general" className="space-y-4">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="api">API Configuration</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <GeneralSettings settings={initialSettings.general} />
      </TabsContent>

      <TabsContent value="api">
        <ApiSettings settings={initialSettings.api} />
      </TabsContent>

      <TabsContent value="security">
        <SecuritySettings settings={initialSettings.security} />
      </TabsContent>
    </Tabs>
  );
}