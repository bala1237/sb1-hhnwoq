import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">API Usage</h3>
        <p className="text-sm text-muted-foreground">
          Monitor your API usage and performance metrics
        </p>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <AlertTriangle className="h-8 w-8 text-destructive" />
          <div className="text-center">
            <h3 className="font-semibold">Usage Data Not Found</h3>
            <p className="text-sm text-muted-foreground">
              The usage data you're looking for doesn't exist or is unavailable.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/portal">Back to Portal</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}