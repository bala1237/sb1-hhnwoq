import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { WhiteLabelContent } from "@/components/admin/white-label/white-label-content";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function WhiteLabelPage() {
  try {
    // Fetch white label settings
    const response = await fetch('http://localhost:3000/api/admin/white-label', {
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
      throw new Error(`Failed to fetch white label settings: ${response.statusText}`);
    }

    const initialSettings = await response.json();

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">White Label Settings</h3>
          <p className="text-sm text-muted-foreground">
            Customize the appearance and branding of your developer portal
          </p>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <WhiteLabelContent initialSettings={initialSettings} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('Error loading white label settings:', error);
    throw error;
  }
}