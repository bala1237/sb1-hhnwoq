import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { AnalyticsContent } from "@/components/enterprise/analytics/analytics-content";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function EnterpriseAnalyticsPage() {
  try {
    // Fetch analytics data
    const response = await fetch('http://localhost:3000/api/enterprise/analytics', {
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
      throw new Error(`Failed to fetch analytics data: ${response.statusText}`);
    }

    const initialData = await response.json();

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Enterprise Analytics</h3>
          <p className="text-sm text-muted-foreground">
            Monitor API usage across all organizations
          </p>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <AnalyticsContent initialData={initialData} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('Error loading analytics:', error);
    throw error;
  }
}