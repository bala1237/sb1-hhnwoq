"use client";
import React from 'react';
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { FeatureConfigDialog } from "./feature-config-dialog";
import { PROTECTED_MODULES, defaultFeatureFlags } from "@/lib/config/feature-flags";

interface FeatureTableProps {
  onChange: () => void;
  onError: (error: string | null) => void;
}

export function FeatureTable({ onChange, onError }: FeatureTableProps) {
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [configDialogOpen, setConfigDialogOpen] = useState(false);
  const [localFeatures, setLocalFeatures] = useState(defaultFeatureFlags);

  const handleToggle = async (moduleId: string, submoduleId?: string, enabled: boolean) => {
    if (!submoduleId && PROTECTED_MODULES.includes(moduleId) && !enabled) {
      onError('This module cannot be disabled as it contains core system functionality');
      return;
    }

    try {
      if (submoduleId) {
        setLocalFeatures(prev => ({
          ...prev,
          modules: {
            ...prev.modules,
            [moduleId]: {
              ...prev.modules[moduleId],
              submodules: {
                ...prev.modules[moduleId].submodules,
                [submoduleId]: {
                  ...prev.modules[moduleId].submodules[submoduleId],
                  enabled
                }
              }
            }
          }
        }));
      } else {
        setLocalFeatures(prev => ({
          ...prev,
          modules: {
            ...prev.modules,
            [moduleId]: {
              ...prev.modules[moduleId],
              enabled
            }
          }
        }));
      }
      onChange();
    } catch (err) {
      onError('Failed to update feature status');
    }
  };

  const handleConfigSave = async (config: any) => {
    try {
      if (selectedFeature) {
        if (selectedFeature.submoduleId) {
          setLocalFeatures(prev => ({
            ...prev,
            modules: {
              ...prev.modules,
              [selectedFeature.moduleId]: {
                ...prev.modules[selectedFeature.moduleId],
                submodules: {
                  ...prev.modules[selectedFeature.moduleId].submodules,
                  [selectedFeature.submoduleId]: {
                    ...prev.modules[selectedFeature.moduleId].submodules[selectedFeature.submoduleId],
                    access: {
                      roles: config.roles,
                      plans: config.plans
                    }
                  }
                }
              }
            }
          }));
        } else {
          setLocalFeatures(prev => ({
            ...prev,
            modules: {
              ...prev.modules,
              [selectedFeature.moduleId]: {
                ...prev.modules[selectedFeature.moduleId],
                access: {
                  roles: config.roles,
                  plans: config.plans
                }
              }
            }
          }));
        }
        onChange();
      }
      setConfigDialogOpen(false);
    } catch (err) {
      onError('Failed to update configuration');
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Module/Feature</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Roles</TableHead>
            <TableHead>Plans</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(localFeatures.modules).map(([moduleId, module]) => (
            <React.Fragment key={moduleId}>
              <TableRow className="bg-muted/50">
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="font-medium capitalize">{moduleId}</div>
                    {module.protected && (
                      <Badge variant="secondary">Protected</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={module.enabled}
                    onCheckedChange={(checked) => handleToggle(moduleId, undefined, checked)}
                    disabled={module.protected}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {module.access?.roles.map(role => (
                      <Badge key={role} variant="outline">
                        {role}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {module.access?.plans.map(plan => (
                      <Badge key={plan} variant="outline">
                        {plan}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedFeature({ 
                        moduleId,
                        type: 'module',
                        ...module
                      });
                      setConfigDialogOpen(true);
                    }}
                    disabled={module.protected}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
              {/* Submodules */}
              {Object.entries(module.submodules).map(([submoduleId, submodule]) => (
                <TableRow key={`${moduleId}-${submoduleId}`}>
                  <TableCell className="pl-8">
                    <div className="font-medium capitalize">{submoduleId}</div>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={submodule.enabled && module.enabled}
                      onCheckedChange={(checked) => handleToggle(moduleId, submoduleId, checked)}
                      disabled={!module.enabled || module.protected}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {submodule.access?.roles.map(role => (
                        <Badge key={role} variant="outline">
                          {role}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {submodule.access?.plans.map(plan => (
                        <Badge key={plan} variant="outline">
                          {plan}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedFeature({
                          moduleId,
                          submoduleId,
                          type: 'submodule',
                          ...submodule
                        });
                        setConfigDialogOpen(true);
                      }}
                      disabled={!module.enabled || module.protected}
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>

      <FeatureConfigDialog
        feature={selectedFeature}
        open={configDialogOpen}
        onOpenChange={setConfigDialogOpen}
        onSave={handleConfigSave}
      />
    </>
  );
}