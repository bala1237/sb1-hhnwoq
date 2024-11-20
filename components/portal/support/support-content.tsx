"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SupportOverview } from "./support-overview";
import { SupportTickets } from "./support-tickets";
import { Documentation } from "./documentation";
import { QuickHelp } from "./quick-help";
import { useToast } from "@/components/ui/use-toast";

interface SupportContentProps {
  initialData: {
    tickets: any[];
    messages: any[];
  };
}

export function SupportContent({ initialData }: SupportContentProps) {
  const [tickets, setTickets] = useState(initialData.tickets);
  const [messages, setMessages] = useState(initialData.messages);
  const { toast } = useToast();

  const handleCreateTicket = async (ticketData: any) => {
    try {
      const response = await fetch('/api/support/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticketData)
      });

      if (!response.ok) {
        throw new Error('Failed to create ticket');
      }

      const newTicket = await response.json();
      setTickets(prev => [...prev, newTicket]);
      
      toast({
        title: "Ticket created",
        description: "Your support ticket has been created successfully."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create support ticket. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <SupportOverview stats={initialData.stats} />

      <Tabs defaultValue="quick-help" className="space-y-4">
        <TabsList>
          <TabsTrigger value="quick-help">Quick Help</TabsTrigger>
          <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
          <TabsTrigger value="docs">Documentation</TabsTrigger>
        </TabsList>

        <TabsContent value="quick-help">
          <QuickHelp onCreateTicket={handleCreateTicket} />
        </TabsContent>

        <TabsContent value="tickets">
          <SupportTickets 
            tickets={tickets} 
            messages={messages}
            onTicketCreate={handleCreateTicket}
            onMessageSend={async (ticketId: string, message: string) => {
              try {
                const response = await fetch(`/api/support/tickets/${ticketId}/messages`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ content: message })
                });

                if (!response.ok) {
                  throw new Error('Failed to send message');
                }

                const newMessage = await response.json();
                setMessages(prev => [...prev, newMessage]);
              } catch (error) {
                toast({
                  title: "Error",
                  description: "Failed to send message. Please try again.",
                  variant: "destructive"
                });
              }
            }}
          />
        </TabsContent>

        <TabsContent value="docs">
          <Documentation />
        </TabsContent>
      </Tabs>
    </>
  );
}