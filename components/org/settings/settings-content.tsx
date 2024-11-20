"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GeneralSettings } from "./general-settings";
import { SecuritySettings } from "./security-settings";
import { WebhookSettings } from "./webhook-settings";

interface SettingsContentProps {
  initialSettings: any;
}

export function SettingsContent({ initialSettings }: SettingsContentProps) {
  return (
    <Tabs defaultValue="general" className="space-y-4">
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <GeneralSettings settings={initialSettings.general} />
      </TabsContent>

      <TabsContent value="security">
        <SecuritySettings settings={initialSettings.security} />
      </TabsContent>

      <TabsContent value="webhooks">
        <WebhookSettings settings={initialSettings.webhooks} />
      </TabsContent>
    </Tabs>
  );
}