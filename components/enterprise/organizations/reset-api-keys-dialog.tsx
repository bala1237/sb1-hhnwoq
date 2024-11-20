"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Organization, enterpriseApi } from "@/lib/api/enterprise";

interface ResetApiKeysDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organization: Organization;
  onSuccess: (organization: Organization) => void;
}

export function ResetApiKeysDialog({
  open,
  onOpenChange,
  organization,
  onSuccess,
}: ResetApiKeysDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onConfirm() {
    try {
      setIsSubmitting(true);
      setError(null);

      const response = await enterpriseApi.resetApiKeys(organization.id);

      if (response.error) {
        setError(response.error);
        return;
      }

      if (response.data) {
        onSuccess(response.data);
        onOpenChange(false);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Error resetting API keys:", err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Reset API Keys
          </DialogTitle>
          <DialogDescription>
            This action will invalidate all existing API keys for {organization.name}.
            Applications using the current keys will stop working immediately.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="bg-muted p-4 rounded-lg text-sm">
          <p className="font-medium">This action will:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Revoke all existing API keys</li>
            <li>Generate new API keys</li>
            <li>Require updating all applications</li>
          </ul>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Resetting..." : "Reset All Keys"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}