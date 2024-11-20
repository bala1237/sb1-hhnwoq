"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface ThemePreviewProps {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

export function ThemePreview({
  primaryColor,
  secondaryColor,
  accentColor,
}: ThemePreviewProps) {
  return (
    <div className="rounded-lg border p-4 space-y-4">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Button Variants</h4>
        <div className="flex gap-2">
          <Button style={{ backgroundColor: primaryColor }}>Primary</Button>
          <Button variant="secondary" style={{ backgroundColor: secondaryColor }}>
            Secondary
          </Button>
          <Button variant="outline">Outline</Button>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Form Elements</h4>
        <div className="flex gap-2">
          <Input placeholder="Input field" />
          <Button style={{ backgroundColor: accentColor }}>Submit</Button>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Components</h4>
        <div className="flex gap-2">
          <Badge style={{ backgroundColor: primaryColor }}>Badge</Badge>
          <Badge variant="outline">Outline Badge</Badge>
          <Badge style={{ backgroundColor: secondaryColor }}>Secondary</Badge>
        </div>
      </div>

      <Card className="p-4">
        <h4 className="text-sm font-medium mb-2">Card Example</h4>
        <p className="text-sm text-muted-foreground">
          This is how your content will look inside cards.
        </p>
      </Card>
    </div>
  );
}