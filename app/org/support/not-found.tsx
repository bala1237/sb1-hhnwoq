import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Support</h3>
        <p className="text-sm text-muted-foreground">
          Get help with API integration and technical issues
        </p>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <AlertTriangle className="h-8 w-8 text-destructive" />
          <div className="text-center">
            <h3 className="font-semibold">Support Not Found</h3>
            <p className="text-sm text-muted-foreground">
              The support data you're looking for doesn't exist or has been removed.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/org">Back to Organization</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}