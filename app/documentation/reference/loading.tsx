import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <Card>
      <CardContent className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading API reference...</p>
        </div>
      </CardContent>
    </Card>
  );
}