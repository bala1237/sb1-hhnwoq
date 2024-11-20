import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { DashboardContent } from "@/components/admin/dashboard/dashboard-content";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  try {
    // Fetch dashboard data
    const response = await fetch('http://localhost:3000/api/admin/dashboard', {
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
      throw new Error(`Failed to fetch dashboard data: ${response.statusText}`);
    }

    const initialData = await response.json();

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Dashboard</h3>
          <p className="text-sm text-muted-foreground">
            Welcome to your developer portal admin dashboard
          </p>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <DashboardContent initialData={initialData} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('Error loading dashboard:', error);
    throw error;
  }
}