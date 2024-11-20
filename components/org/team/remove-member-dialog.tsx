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

interface RemoveMemberDialogProps {
  member: {
    name: string;
    role: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function RemoveMemberDialog({
  member,
  open,
  onOpenChange,
  onConfirm,
}: RemoveMemberDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Remove Team Member
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to remove {member.name} from the team? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-muted p-4 rounded-lg text-sm">
          <p className="font-medium">This action will:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Remove the user from your organization</li>
            <li>Revoke all their access permissions</li>
            <li>Cancel any pending invitations</li>
            {member.role === "Admin" && (
              <li className="text-destructive">
                Transfer or reassign their administrative responsibilities
              </li>
            )}
          </ul>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            Remove Member
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}