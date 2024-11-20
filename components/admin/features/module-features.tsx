"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useFeatures } from "@/lib/hooks/use-features";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Save } from "lucide-react";

interface ModuleFeaturesProps {
  onError: (error: string | null) => void;
}

export function ModuleFeatures({ onError }: ModuleFeaturesProps) {
  const { features, loading } = useFeatures();
  const [localFeatures, setLocalFeatures] = useState(features);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const handleModuleToggle = (moduleName: string, enabled: boolean) => {
    setLocalFeatures(prev => ({
      ...prev,
      modules: {
        ...prev.modules,
        [moduleName]: {
          ...prev.modules[moduleName],
          enabled
        }
      }
    }));
    setHasChanges(true);
  };

  const handleSubmoduleToggle = (
    moduleName: string,
    submoduleName: string,
    enabled: boolean
  ) => {
    setLocalFeatures(prev => ({
      ...prev,
      modules: {
        ...prev.modules,
        [moduleName]: {
          ...prev.modules[moduleName],
          submodules: {
            ...prev.modules[moduleName].submodules,
            [submoduleName]: enabled
          }
        }
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

      {Object.entries(localFeatures.modules).map(([moduleName, module]) => (
        <Card key={moduleName}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="capitalize">{moduleName}</CardTitle>
              <Switch
                checked={module.enabled}
                onCheckedChange={(checked) => handleModuleToggle(moduleName, checked)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant={module.enabled ? "default" : "secondary"}>
                  {module.enabled ? "Enabled" : "Disabled"}
                </Badge>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label className="text-sm font-medium">Submodules</Label>
                <div className="grid gap-4">
                  {Object.entries(module.submodules).map(([submoduleName, enabled]) => (
                    <div
                      key={submoduleName}
                      className="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div className="space-y-0.5">
                        <Label className="text-base capitalize">{submoduleName}</Label>
                      </div>
                      <Switch
                        disabled={!module.enabled}
                        checked={enabled && module.enabled}
                        onCheckedChange={(checked) =>
                          handleSubmoduleToggle(moduleName, submoduleName, checked)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}