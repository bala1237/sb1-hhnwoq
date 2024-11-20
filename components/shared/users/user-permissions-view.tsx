"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";
import { User } from "@/lib/types/users";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface UserPermissionsViewProps {
  user: User;
  context: 'admin' | 'enterprise';
  onUpdate?: (user: User) => void;
}

const internalPermissions = {
  platform: [
    { id: "manage_users", label: "Manage Users" },
    { id: "manage_roles", label: "Manage Roles" },
    { id: "manage_organizations", label: "Manage Organizations" },
    { id: "view_analytics", label: "View Analytics" },
    { id: "manage_settings", label: "Manage Settings" },
  ],
  support: [
    { id: "view_tickets", label: "View Support Tickets" },
    { id: "manage_tickets", label: "Manage Support Tickets" },
    { id: "view_user_data", label: "View User Data" },
    { id: "manage_docs", label: "Manage Documentation" },
  ],
  security: [
    { id: "audit_logs", label: "View Audit Logs" },
    { id: "security_settings", label: "Manage Security Settings" },
    { id: "compliance_reports", label: "Generate Compliance Reports" },
    { id: "api_monitoring", label: "Monitor API Usage" },
  ],
};

const externalPermissions = {
  organization: [
    { id: "manage_org_users", label: "Manage Organization Users" },
    { id: "manage_org_settings", label: "Manage Organization Settings" },
    { id: "view_org_analytics", label: "View Organization Analytics" },
    { id: "manage_org_billing", label: "Manage Billing" },
  ],
  api: [
    { id: "create_api_keys", label: "Create API Keys" },
    { id: "manage_webhooks", label: "Manage Webhooks" },
    { id: "view_api_logs", label: "View API Logs" },
    { id: "manage_applications", label: "Manage Applications" },
  ],
  support: [
    { id: "create_tickets", label: "Create Support Tickets" },
    { id: "view_documentation", label: "View Documentation" },
    { id: "access_sandbox", label: "Access Sandbox Environment" },
  ],
};

export function UserPermissionsView({ user, context, onUpdate }: UserPermissionsViewProps) {
  const [error, setError] = useState<string | null>(null);
  const permissions = user.type === 'internal' ? internalPermissions : externalPermissions;

  const handleSubmit = async () => {
    try {
      setError(null);
      // Handle permissions update
      await onUpdate?.(user);
    } catch (err) {
      setError('Failed to update permissions');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          {user.type === 'internal' ? 'Enterprise Permissions' : 'Organization Permissions'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          {Object.entries(permissions).map(([category, perms]) => (
            <div key={category} className="space-y-4">
              <h3 className="font-medium capitalize">{category.replace('_', ' ')} Permissions</h3>
              <div className="grid grid-cols-2 gap-4">
                {perms.map((permission) => (
                  <div key={permission.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={permission.id} 
                      defaultChecked={user.type === 'internal' && user.role === 'enterprise_admin'}
                    />
                    <Label htmlFor={permission.id}>{permission.label}</Label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <Button variant="outline">Reset to Default</Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </div>
      </CardContent>
    </Card>
  );
}