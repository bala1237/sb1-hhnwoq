import { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { openApiSpec } from '@/lib/config/openapi';
import { SwaggerUIWrapper } from '@/components/reference/swagger-ui-wrapper';
import { LoadingSpinner } from "@/components/shared/loading-spinner";

export const dynamic = 'force-dynamic';

export default async function ApiReferencePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">API Reference</h3>
        <p className="text-sm text-muted-foreground">
          Explore and test our API endpoints
        </p>
      </div>

      <Card className="p-6">
        <div className="swagger-wrapper dark:swagger-dark">
          <Suspense fallback={<LoadingSpinner />}>
            <SwaggerUIWrapper spec={openApiSpec} />
          </Suspense>
        </div>
      </Card>
    </div>
  );
}