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
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Organization, enterpriseApi } from "@/lib/api/enterprise";

interface SuspendOrganizationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  organization: Organization;
  onSuccess: (organization: Organization) => void;
}

export function SuspendOrganizationDialog({
  open,
  onOpenChange,
  organization,
  onSuccess,
}: SuspendOrganizationDialogProps) {
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const newStatus = organization.status === "active" ? "suspended" : "active";
  const actionText = organization.status === "active" ? "Suspend" : "Reactivate";

  async function onConfirm() {
    try {
      setIsSubmitting(true);
      setError(null);

      const response = await enterpriseApi.toggleOrganizationStatus(
        organization.id,
        newStatus,
        reason
      );

      if (response.error) {
        setError(response.error);
        return;
      }

      if (response.data) {
        onSuccess(response.data);
        onOpenChange(false);
        setReason("");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Error updating organization status:", err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            {actionText} Organization
          </DialogTitle>
          <DialogDescription>
            This action will {actionText.toLowerCase()} all access for {organization.name}.
            {organization.status === "active" && " All API calls will be rejected immediately."}
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-lg text-sm">
            <p className="font-medium">This action will:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              {organization.status === "active" ? (
                <>
                  <li>Disable all API access</li>
                  <li>Prevent user logins</li>
                  <li>Preserve all data and settings</li>
                </>
              ) : (
                <>
                  <li>Re-enable API access</li>
                  <li>Allow user logins</li>
                  <li>Restore previous settings</li>
                </>
              )}
            </ul>
          </div>
          <div className="space-y-2">
            <label htmlFor="reason" className="text-sm font-medium">
              {actionText} Reason
            </label>
            <Textarea
              id="reason"
              placeholder={`Enter the reason for ${actionText.toLowerCase()}ing the organization...`}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="h-24"
            />
          </div>
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
            disabled={isSubmitting || !reason.trim()}
          >
            {isSubmitting ? `${actionText}ing...` : actionText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}