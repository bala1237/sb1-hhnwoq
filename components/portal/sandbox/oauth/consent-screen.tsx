"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { TestUser } from "@/lib/config/test-users";

interface ConsentScreenProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onResponse: (approved: boolean) => void;
  scopes: string[];
  user: TestUser;
}

export function ConsentScreen({
  open,
  onOpenChange,
  onResponse,
  scopes,
  user
}: ConsentScreenProps) {
  const [selectedScopes, setSelectedScopes] = useState<string[]>(scopes);

  const scopeDescriptions: Record<string, string> = {
    accounts: "View your account information and balances",
    payments: "Initiate and view payments",
    balances: "View real-time balance information",
    transactions: "View transaction history",
    statements: "Access account statements",
    beneficiaries: "Manage payment beneficiaries"
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Authorize Access</DialogTitle>
          <DialogDescription>
            The application is requesting access to your banking information
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="space-y-4">
            <h4 className="text-sm font-medium">User Details</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium">{user.displayName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Account Type:</span>
                <Badge variant="outline">{user.type}</Badge>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium">Requested Permissions</h4>
            <div className="space-y-4">
              {scopes.map((scope) => (
                <div key={scope} className="flex items-start space-x-3">
                  <Checkbox
                    id={scope}
                    checked={selectedScopes.includes(scope)}
                    onCheckedChange={(checked) => {
                      setSelectedScopes(
                        checked
                          ? [...selectedScopes, scope]
                          : selectedScopes.filter((s) => s !== scope)
                      );
                    }}
                  />
                  <div className="space-y-1">
                    <label
                      htmlFor={scope}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {scope}
                    </label>
                    <p className="text-sm text-muted-foreground">
                      {scopeDescriptions[scope]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border p-4 text-sm">
            <p className="font-medium mb-2">Security Note</p>
            <p className="text-muted-foreground">
              This is a sandbox environment. In a production environment, you would be
              authenticating with your actual bank credentials.
            </p>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={() => onResponse(false)}
          >
            Deny
          </Button>
          <Button
            onClick={() => onResponse(true)}
            disabled={selectedScopes.length === 0}
          >
            Authorize
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}