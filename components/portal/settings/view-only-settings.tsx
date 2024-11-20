"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ViewOnlySettings() {
  const userDetails = {
    fullName: "John Doe",
    email: "john@acme.com",
    timezone: "America/New_York",
    language: "English",
    company: "Acme Corp",
    role: "Viewer",
    notifications: {
      emailNotifications: true,
      apiKeyExpiration: true,
      usageAlerts: true,
      securityAlerts: true,
    },
    apiSettings: {
      defaultVersion: "v1",
      webhookUrl: "https://api.acme.com/webhooks",
      retryEnabled: true,
      maxRetries: "3",
    },
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/avatars/viewer.png" alt="Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>

          <div className="grid gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <p className="text-sm">{userDetails.fullName}</p>
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <p className="text-sm">{userDetails.email}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Company</Label>
                <p className="text-sm">{userDetails.company}</p>
              </div>

              <div className="space-y-2">
                <Label>Role</Label>
                <p className="text-sm">{userDetails.role}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Timezone</Label>
                <p className="text-sm">{userDetails.timezone}</p>
              </div>

              <div className="space-y-2">
                <Label>Language</Label>
                <p className="text-sm">{userDetails.language}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(userDetails.notifications).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-2 border-b">
                <Label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Label>
                <span className="text-sm">{value ? 'Enabled' : 'Disabled'}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(userDetails.apiSettings).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center py-2 border-b">
                <Label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Label>
                <span className="text-sm">{value.toString()}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}