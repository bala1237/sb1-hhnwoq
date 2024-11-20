"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BasicInfoForm } from "./create-key/basic-info-form";
import { OAuthConfigForm } from "./create-key/oauth-config-form";
import { SecuritySettingsForm } from "./create-key/security-settings-form";
import { KeyDisplayDialog } from "./key-display-dialog";
import { useToast } from "@/components/ui/use-toast";

interface CreateApiKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export type ApiKeyFormData = {
  // Basic Info
  name: string;
  description?: string;
  environment: "sandbox" | "development" | "production";
  applicationType: "web" | "mobile" | "service";
  
  // OAuth Config
  redirectUrls: string[];
  allowedDomains: string[];
  scopes: string[];
  
  // Security Settings
  ipWhitelist?: string[];
  rateLimit: number;
  autoRotate: boolean;
  rotationPeriod?: number;
  usageAlerts: boolean;
  usageThreshold?: number;
};

const defaultFormData: ApiKeyFormData = {
  name: "",
  environment: "development",
  applicationType: "web",
  redirectUrls: [],
  allowedDomains: [],
  scopes: [],
  rateLimit: 1000,
  autoRotate: false,
  usageAlerts: false
};

export function CreateApiKeyDialog({ open, onOpenChange }: CreateApiKeyDialogProps) {
  const [currentTab, setCurrentTab] = useState("basic");
  const [formData, setFormData] = useState<ApiKeyFormData>(defaultFormData);
  const [showKeyDisplay, setShowKeyDisplay] = useState(false);
  const [generatedKey, setGeneratedKey] = useState<any>(null);
  const { toast } = useToast();

  const updateFormData = (step: string, data: Partial<ApiKeyFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    switch (currentTab) {
      case "basic":
        setCurrentTab("oauth");
        break;
      case "oauth":
        setCurrentTab("security");
        break;
      case "security":
        handleSubmit();
        break;
    }
  };

  const handleBack = () => {
    switch (currentTab) {
      case "oauth":
        setCurrentTab("basic");
        break;
      case "security":
        setCurrentTab("oauth");
        break;
    }
  };

  const handleSubmit = async () => {
    try {
      // API call would go here
      const mockCredentials = {
        clientId: `client_${Math.random().toString(36).substring(7)}`,
        clientSecret: `secret_${Math.random().toString(36).substring(7)}`,
        keyType: formData.applicationType,
        environment: formData.environment,
      };

      setGeneratedKey(mockCredentials);
      setShowKeyDisplay(true);
    } catch (error) {
      console.error('Error generating API key:', error);
      toast({
        title: "Error",
        description: "Failed to generate API key. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleClose = () => {
    setFormData(defaultFormData);
    setCurrentTab("basic");
    onOpenChange(false);
  };

  if (showKeyDisplay && generatedKey) {
    return (
      <KeyDisplayDialog
        open={true}
        onOpenChange={(open) => {
          setShowKeyDisplay(open);
          if (!open) {
            handleClose();
          }
        }}
        keyDetails={generatedKey}
      />
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create API Key</DialogTitle>
        </DialogHeader>

        <Tabs value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="oauth">OAuth Config</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <BasicInfoForm
              data={formData}
              onUpdate={(data) => updateFormData("basic", data)}
              onNext={handleNext}
            />
          </TabsContent>

          <TabsContent value="oauth">
            <OAuthConfigForm
              data={formData}
              onUpdate={(data) => updateFormData("oauth", data)}
              onNext={handleNext}
              onBack={handleBack}
            />
          </TabsContent>

          <TabsContent value="security">
            <SecuritySettingsForm
              data={formData}
              onUpdate={(data) => updateFormData("security", data)}
              onSubmit={handleSubmit}
              onBack={handleBack}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}