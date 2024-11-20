"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";

const permissions = {
  enterpriseAdmin: [
    { id: "manage-all-orgs", label: "Manage All Organizations" },
    { id: "manage-enterprise-users", label: "Manage Enterprise Users" },
    { id: "view-enterprise-analytics", label: "View Enterprise Analytics" },
    { id: "manage-security-settings", label: "Manage Security Settings" },
    { id: "manage-billing", label: "Manage Billing & Subscriptions" },
  ],
  supportManager: [
    { id: "view-organizations", label: "View Organizations" },
    { id: "manage-support-tickets", label: "Manage Support Tickets" },
    { id: "view-user-data", label: "View User Data" },
    { id: "manage-documentation", label: "Manage Documentation" },
    { id: "view-usage-metrics", label: "View Usage Metrics" },
  ],
  securityAuditor: [
    { id: "view-audit-logs", label: "View Audit Logs" },
    { id: "run-security-scans", label: "Run Security Scans" },
    { id: "view-security-settings", label: "View Security Settings" },
    { id: "generate-compliance-reports", label: "Generate Compliance Reports" },
    { id: "monitor-api-usage", label: "Monitor API Usage" },
  ],
};

interface UserPermissionsContentProps {
  params: {
    id: string;
  };
}

export function UserPermissionsContent({ params }: UserPermissionsContentProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium">User Permissions</h3>
          <p className="text-sm text-muted-foreground">
            Manage enterprise-level permissions for this user
          </p>
        </div>
        <Button>Save Changes</Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Enterprise Admin Permissions
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {permissions.enterpriseAdmin.map((permission) => (
              <div key={permission.id} className="flex items-center space-x-2">
                <Checkbox id={permission.id} />
                <Label htmlFor={permission.id}>{permission.label}</Label>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Support Manager Permissions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {permissions.supportManager.map((permission) => (
              <div key={permission.id} className="flex items-center space-x-2">
                <Checkbox id={permission.id} />
                <Label htmlFor={permission.id}>{permission.label}</Label>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Auditor Permissions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {permissions.securityAuditor.map((permission) => (
              <div key={permission.id} className="flex items-center space-x-2">
                <Checkbox id={permission.id} />
                <Label htmlFor={permission.id}>{permission.label}</Label>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}