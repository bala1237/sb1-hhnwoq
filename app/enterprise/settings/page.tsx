import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { EnterpriseSettingsContent } from "@/components/enterprise/settings/enterprise-settings-content";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function EnterpriseSettingsPage() {
  try {
    // Fetch enterprise settings
    const response = await fetch('http://localhost:3000/api/enterprise/settings', {
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
      throw new Error(`Failed to fetch enterprise settings: ${response.statusText}`);
    }

    const initialSettings = await response.json();

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Enterprise Settings</h3>
          <p className="text-sm text-muted-foreground">
            Manage global settings for the enterprise portal
          </p>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <EnterpriseSettingsContent initialSettings={initialSettings} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('Error loading enterprise settings:', error);
    throw error;
  }
}