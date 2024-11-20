import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Analytics</h3>
        <p className="text-sm text-muted-foreground">
          Monitor your API usage and performance metrics
        </p>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <AlertTriangle className="h-8 w-8 text-destructive" />
          <div className="text-center">
            <h3 className="font-semibold">Analytics Not Found</h3>
            <p className="text-sm text-muted-foreground">
              The analytics data you're looking for doesn't exist or has been removed.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/admin">Back to Admin</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}