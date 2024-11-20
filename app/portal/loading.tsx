import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
      <Card>
        <CardContent className="flex flex-col items-center justify-center min-h-[200px] gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading portal...</p>
        </CardContent>
      </Card>
    </div>
  );
}