"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SupportOverview } from "./support-overview";
import { SupportTickets } from "./support-tickets";
import { Documentation } from "./documentation";
import { QuickHelp } from "./quick-help";

interface SupportContentProps {
  initialData: {
    tickets: any[];
    messages: any[];
  };
}

export function SupportContent({ initialData }: SupportContentProps) {
  return (
    <>
      <SupportOverview />

      <Tabs defaultValue="quick-help" className="space-y-4">
        <TabsList>
          <TabsTrigger value="quick-help">Quick Help</TabsTrigger>
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
          <TabsTrigger value="docs">Documentation</TabsTrigger>
        </TabsList>

        <TabsContent value="quick-help">
          <QuickHelp />
        </TabsContent>

        <TabsContent value="tickets">
          <SupportTickets 
            tickets={initialData.tickets} 
            messages={initialData.messages} 
          />
        </TabsContent>

        <TabsContent value="docs">
          <Documentation />
        </TabsContent>
      </Tabs>
    </>
  );
}