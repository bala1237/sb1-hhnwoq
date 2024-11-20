import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { FeaturesContent } from "@/components/admin/features/features-content";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function FeaturesPage() {
  try {
    // Fetch features data
    const response = await fetch('http://localhost:3000/api/admin/features', {
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
      throw new Error(`Failed to fetch features: ${response.statusText}`);
    }

    const initialFeatures = await response.json();

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Feature Management</h3>
          <p className="text-sm text-muted-foreground">
            Configure and manage portal features and modules
          </p>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <FeaturesContent initialFeatures={initialFeatures} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('Error loading features:', error);
    throw error;
  }
}