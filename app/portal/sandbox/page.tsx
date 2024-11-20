import { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { SandboxContent } from "@/components/portal/sandbox/sandbox-content";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function SandboxPage() {
  try {
    // Fetch sandbox configuration
    const response = await fetch('http://localhost:3000/api/portal/sandbox/config', {
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error('Failed to fetch sandbox configuration');
    }

    const initialConfig = await response.json();

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Developer Sandbox</h3>
          <p className="text-sm text-muted-foreground">
            Test OAuth flows and API endpoints in a secure environment
          </p>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <SandboxContent initialConfig={initialConfig} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('Error loading sandbox:', error);
    notFound();
  }
}