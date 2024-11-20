import { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { SupportContent } from "@/components/portal/support/support-content";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function SupportPage() {
  try {
    // Fetch support data
    const [ticketsResponse, messagesResponse] = await Promise.all([
      fetch('http://localhost:3000/api/support/tickets', {
        cache: 'no-store'
      }),
      fetch('http://localhost:3000/api/support/messages', {
        cache: 'no-store'
      })
    ]);

    if (!ticketsResponse.ok || !messagesResponse.ok) {
      if (ticketsResponse.status === 404 || messagesResponse.status === 404) {
        notFound();
      }
      throw new Error('Failed to fetch support data');
    }

    const initialData = {
      tickets: await ticketsResponse.json(),
      messages: await messagesResponse.json()
    };

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Support</h3>
          <p className="text-sm text-muted-foreground">
            Get help with API integration and technical issues
          </p>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <SupportContent initialData={initialData} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('Error loading support data:', error);
    throw error;
  }
}