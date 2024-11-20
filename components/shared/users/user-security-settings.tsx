"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Shield, Key, AlertTriangle } from "lucide-react";
import { User } from "@/lib/types/users";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface UserSecuritySettingsProps {
  user: User;
  context: 'admin' | 'enterprise';
  onAction?: (action: string, user: User) => void;
}

export function UserSecuritySettings({ 
  user, 
  context,
  onAction 
}: UserSecuritySettingsProps) {
  const [error, setError] = useState<string | null>(null);

  const handleAction = async (action: string) => {
    try {
      setError(null);
      await onAction?.(action, user);
    } catch (err) {
      setError('Failed to perform action. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

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
          <Button 
            variant="outline"
            onClick={() => handleAction('reset_2fa')}
          >
            Reset 2FA
          </Button>
        </CardContent>
      </Card>

      {user.type === 'external' && (
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
            <Button 
              variant="outline"
              onClick={() => handleAction('revoke_api_keys')}
            >
              Revoke All API Keys
            </Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            <CardTitle>Security Actions</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => handleAction('reset_password')}
          >
            Force Password Reset
          </Button>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => handleAction('revoke_sessions')}
          >
            Revoke All Sessions
          </Button>
          <Button 
            variant="destructive" 
            className="w-full"
            onClick={() => handleAction('suspend')}
            disabled={user.status === 'suspended'}
          >
            {user.status === 'active' ? 'Suspend Account' : 'Account Suspended'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}