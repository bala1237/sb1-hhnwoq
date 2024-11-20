import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { SettingsContent } from "@/components/admin/settings/settings-content";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
  try {
    // Fetch settings data
    const response = await fetch('http://localhost:3000/api/admin/settings', {
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
      throw new Error(`Failed to fetch settings: ${response.statusText}`);
    }

    const initialSettings = await response.json();

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Settings</h3>
          <p className="text-sm text-muted-foreground">
            Manage your developer portal settings and configurations
          </p>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <SettingsContent initialSettings={initialSettings} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('Error loading settings:', error);
    throw error;
  }
}