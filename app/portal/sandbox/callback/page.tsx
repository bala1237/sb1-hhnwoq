import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { CallbackHandler } from "@/components/portal/sandbox/oauth/callback-handler";

export const dynamic = 'force-dynamic';

export default async function CallbackPage({
  searchParams
}: {
  searchParams: { code?: string; state?: string; error?: string }
}) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">OAuth Callback</h3>
        <p className="text-sm text-muted-foreground">
          Processing OAuth authorization response
        </p>
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        <CallbackHandler 
          code={searchParams.code}
          state={searchParams.state}
          error={searchParams.error}
        />
      </Suspense>
    </div>
  );
}