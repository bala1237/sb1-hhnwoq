import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Users</h3>
        <p className="text-sm text-muted-foreground">
          Manage users within your organization
        </p>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <AlertTriangle className="h-8 w-8 text-destructive" />
          <div className="text-center">
            <h3 className="font-semibold">Users Not Found</h3>
            <p className="text-sm text-muted-foreground">
              The users you're looking for don't exist or have been removed.
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