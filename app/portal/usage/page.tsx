import { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { UsageContent } from "@/components/portal/usage/usage-content";
import { notFound } from "next/navigation";
import { getApiUrl } from "@/lib/utils/api-url";

export const dynamic = 'force-dynamic';

export default async function UsagePage({ 
  searchParams 
}: { 
  searchParams: { apiKey?: string } 
}) {
  try {
    // Fetch usage data
    const response = await fetch(getApiUrl('usage'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      if (response.status === 404) {
        notFound();
      }
      throw new Error(`Failed to fetch usage data: ${response.statusText}`);
    }

    const initialData = await response.json();

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">API Usage</h3>
          <p className="text-sm text-muted-foreground">
            Monitor your API usage and performance metrics
          </p>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <UsageContent 
            initialData={initialData}
            apiKey={searchParams.apiKey}
          />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('Error loading usage data:', error);
    throw error;
  }
}