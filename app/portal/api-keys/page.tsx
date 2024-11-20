import { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { ApiKeysContent } from "@/components/portal/api-keys/api-keys-content";

export const dynamic = 'force-dynamic';

export default async function ApiKeysPage() {
  // Fetch API keys data
  const response = await fetch('http://localhost:3000/api/portal/api-keys', {
    cache: 'no-store'
  });
  const initialApiKeys = await response.json();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">API Keys</h3>
        <p className="text-sm text-muted-foreground">
          Manage your API keys and access tokens
        </p>
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        <ApiKeysContent initialApiKeys={initialApiKeys} />
      </Suspense>
    </div>
  );
}