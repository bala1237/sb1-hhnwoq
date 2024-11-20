"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useFeatures } from "@/lib/hooks/use-features";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Save } from "lucide-react";

interface GlobalFeaturesProps {
  onError: (error: string | null) => void;
}

export function GlobalFeatures({ onError }: GlobalFeaturesProps) {
  const { features, loading } = useFeatures();
  const [localFeatures, setLocalFeatures] = useState(features);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleFeatureToggle = (featureName: string, enabled: boolean) => {
    setLocalFeatures(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [featureName]: enabled
      }
    }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      onError(null);

      const response = await fetch('/api/enterprise/features', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(localFeatures)
      });

      if (!response.ok) {
        throw new Error('Failed to update features');
      }

      setHasChanges(false);
    } catch (err) {
      onError('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="min-h-[400px] flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {hasChanges && (
        <Card className="border-yellow-500">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2 text-yellow-500">
              <AlertTriangle className="h-5 w-5" />
              <p>You have unsaved changes</p>
            </div>
            <Button onClick={handleSave} disabled={saving}>
              <Save className="mr-2 h-4 w-4" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Global Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(localFeatures.features).map(([featureName, enabled]) => (
              <div
                key={featureName}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="space-y-0.5">
                  <Label className="text-base capitalize">
                    {featureName.replace(/([A-Z])/g, ' $1').trim()}
                  </Label>
                  <Badge variant={enabled ? "default" : "secondary"}>
                    {enabled ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
                <Switch
                  checked={enabled}
                  onCheckedChange={(checked) =>
                    handleFeatureToggle(featureName, checked)
                  }
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}