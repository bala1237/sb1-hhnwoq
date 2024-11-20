"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/code-block";

export function EventSimulator() {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [lastEvent, setLastEvent] = useState<any>(null);

  const events = {
    payment_status: [
      { id: "payment_authorized", name: "Payment Authorized" },
      { id: "payment_completed", name: "Payment Completed" },
      { id: "payment_failed", name: "Payment Failed" }
    ],
    balance_update: [
      { id: "balance_increased", name: "Balance Increased" },
      { id: "balance_decreased", name: "Balance Decreased" },
      { id: "overdraft_alert", name: "Overdraft Alert" }
    ],
    account_events: [
      { id: "account_locked", name: "Account Locked" },
      { id: "account_unlocked", name: "Account Unlocked" },
      { id: "limit_changed", name: "Spending Limit Changed" }
    ],
    consent_status: [
      { id: "consent_expired", name: "Consent Expired" },
      { id: "consent_revoked", name: "Consent Revoked" },
      { id: "consent_updated", name: "Consent Updated" }
    ]
  };

  const simulateEvent = () => {
    const eventData = {
      id: `evt_${Math.random().toString(36).substr(2, 9)}`,
      type: selectedEvent,
      timestamp: new Date().toISOString(),
      data: {
        // Example event data
        accountId: "acc_123",
        status: "completed",
        amount: 100.00,
        currency: "GBP"
      }
    };

    setLastEvent(eventData);
    // In a real implementation, this would trigger a webhook
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Event Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {Object.entries(events).map(([category, categoryEvents]) => (
              <div key={category} className="space-y-2">
                <h4 className="text-sm font-medium capitalize">
                  {category.replace('_', ' ')}
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {categoryEvents.map((event) => (
                    <Button
                      key={event.id}
                      variant={selectedEvent === event.id ? "default" : "outline"}
                      onClick={() => setSelectedEvent(event.id)}
                      className="justify-start"
                    >
                      {event.name}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <Button 
            className="w-full mt-4"
            onClick={simulateEvent}
            disabled={!selectedEvent}
          >
            Trigger Event
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Last Simulated Event</CardTitle>
        </CardHeader>
        <CardContent>
          {lastEvent ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge>Event ID: {lastEvent.id}</Badge>
                <Badge variant="outline">{lastEvent.type}</Badge>
              </div>
              <CodeBlock
                code={JSON.stringify(lastEvent, null, 2)}
                language="json"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-[200px] text-muted-foreground">
              No events simulated yet
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}