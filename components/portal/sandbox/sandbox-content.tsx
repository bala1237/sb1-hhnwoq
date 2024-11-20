"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ApiTester } from "./api-tester";
import { OAuthTester } from "./oauth-tester";
import { MockData } from "./mock-data";
import { EventSimulator } from "./event-simulator";

interface SandboxContentProps {
  initialConfig: any;
}

export function SandboxContent({ initialConfig }: SandboxContentProps) {
  return (
    <Tabs defaultValue="oauth" className="space-y-4">
      <TabsList>
        <TabsTrigger value="oauth">OAuth Flow</TabsTrigger>
        <TabsTrigger value="api-tester">API Tester</TabsTrigger>
        <TabsTrigger value="mock-data">Mock Data</TabsTrigger>
        <TabsTrigger value="event-simulator">Event Simulator</TabsTrigger>
      </TabsList>

      <TabsContent value="oauth">
        <OAuthTester config={initialConfig.oauth} />
      </TabsContent>

      <TabsContent value="api-tester">
        <ApiTester endpoints={initialConfig.endpoints} />
      </TabsContent>

      <TabsContent value="mock-data">
        <MockData data={initialConfig.mockData} />
      </TabsContent>

      <TabsContent value="event-simulator">
        <EventSimulator events={initialConfig.events} />
      </TabsContent>
    </Tabs>
  );
}