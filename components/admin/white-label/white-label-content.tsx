"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BrandingSettings } from "./branding-settings";
import { ThemeSettings } from "./theme-settings";
import { EmailTemplateSettings } from "./email-template-settings";

interface WhiteLabelContentProps {
  initialSettings: any;
}

export function WhiteLabelContent({ initialSettings }: WhiteLabelContentProps) {
  return (
    <Tabs defaultValue="branding" className="space-y-4">
      <TabsList>
        <TabsTrigger value="branding">Branding</TabsTrigger>
        <TabsTrigger value="theme">Theme</TabsTrigger>
        <TabsTrigger value="email">Email Templates</TabsTrigger>
      </TabsList>

      <TabsContent value="branding">
        <BrandingSettings settings={initialSettings.branding} />
      </TabsContent>

      <TabsContent value="theme">
        <ThemeSettings settings={initialSettings.theme} />
      </TabsContent>

      <TabsContent value="email">
        <EmailTemplateSettings settings={initialSettings.emailTemplates} />
      </TabsContent>
    </Tabs>
  );
}