import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/shared/loading-spinner";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">White Label Settings</h3>
        <p className="text-sm text-muted-foreground">
          Customize the appearance and branding of your developer portal
        </p>
      </div>

      <Card>
        <CardContent className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner />
        </CardContent>
      </Card>
    </div>
  );
}