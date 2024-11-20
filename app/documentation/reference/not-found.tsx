import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <AlertTriangle className="h-8 w-8 text-destructive" />
        <div className="text-center">
          <h3 className="font-semibold">API Reference Not Found</h3>
          <p className="text-sm text-muted-foreground">
            The API reference you're looking for doesn't exist.
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/documentation">Back to Documentation</Link>
        </Button>
      </CardContent>
    </Card>
  );
}