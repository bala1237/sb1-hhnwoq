"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PersonalSettings } from "./personal-settings";
import { NotificationSettings } from "./notification-settings";
import { ApiSettings } from "./api-settings";
import { ViewOnlySettings } from "./view-only-settings";
import { useToast } from "@/components/ui/use-toast";

interface SettingsContentProps {
  initialSettings: any;
}

export function SettingsContent({ initialSettings }: SettingsContentProps) {
  const [settings, setSettings] = useState(initialSettings);
  const { toast } = useToast();
  const userRole = settings.personal.role.toLowerCase();
  const isViewer = userRole === "viewer";

  const handleSettingsUpdate = async (section: string, updates: any) => {
    try {
      const response = await fetch('/api/portal/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, updates })
      });

      if (!response.ok) {
        throw new Error('Failed to update settings');
      }

      const updatedSettings = await response.json();
      setSettings(updatedSettings);
      
      toast({
        title: "Settings updated",
        description: "Your changes have been saved successfully."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (isViewer) {
    return <ViewOnlySettings settings={settings} />;
  }

  return (
    <Tabs defaultValue="personal" className="space-y-4">
      <TabsList>
        <TabsTrigger value="personal">Personal</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="api">API Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="personal">
        <PersonalSettings 
          settings={settings.personal} 
          onUpdate={(updates) => handleSettingsUpdate('personal', updates)} 
        />
      </TabsContent>

      <TabsContent value="notifications">
        <NotificationSettings 
          settings={settings.notifications} 
          onUpdate={(updates) => handleSettingsUpdate('notifications', updates)}
        />
      </TabsContent>

      <TabsContent value="api">
        <ApiSettings 
          settings={settings.api} 
          onUpdate={(updates) => handleSettingsUpdate('api', updates)}
        />
      </TabsContent>
    </Tabs>
  );
}