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

interface RevokeKeyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apiKey: {
    id: string;
    name: string;
  } | null;
  onRevoke: () => void;
}

export function RevokeKeyDialog({ 
  open, 
  onOpenChange, 
  apiKey,
  onRevoke 
}: RevokeKeyDialogProps) {
  if (!apiKey) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Revoke API Key
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to revoke the API key "{apiKey.name}"? This action
            cannot be undone, and any applications using this key will stop working
            immediately.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-muted p-4 rounded-lg text-sm">
          <p className="font-medium">This action will:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Immediately invalidate the API key</li>
            <li>Reject all future requests using this key</li>
            <li>Require updating any applications using this key</li>
          </ul>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            variant="destructive" 
            onClick={() => {
              onRevoke();
              onOpenChange(false);
            }}
          >
            Revoke Key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}