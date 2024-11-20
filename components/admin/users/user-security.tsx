"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Shield, Key, AlertTriangle } from "lucide-react";
import { User } from "@/lib/types/users";

interface UserSecurityProps {
  user: User;
}

export function UserSecurity({ user }: UserSecurityProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <CardTitle>Two-Factor Authentication</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>Require 2FA</Label>
              <p className="text-sm text-muted-foreground">
                Enforce two-factor authentication for this user
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Button variant="outline">Reset 2FA</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            <CardTitle>API Access</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label>API Access</Label>
              <p className="text-sm text-muted-foreground">
                Allow user to generate and manage API keys
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Button variant="outline">Revoke All API Keys</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            <CardTitle>Security Actions</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full">
            Force Password Reset
          </Button>
          <Button variant="outline" className="w-full">
            Revoke All Sessions
          </Button>
          <Button variant="destructive" className="w-full">
            Suspend Account
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}