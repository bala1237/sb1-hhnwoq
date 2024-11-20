"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { User } from "@/lib/types/users";
import { UserProfileForm } from "./user-profile-form";
import { UserSecuritySettings } from "./user-security-settings";
import { UserPermissionsView } from "./user-permissions-view";
import { UserActivityLog } from "./user-activity-log";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface UserDetailsViewProps {
  user: User;
  context: 'admin' | 'enterprise';
  onUserUpdate?: (user: User) => void;
  onUserAction?: (action: string, user: User) => void;
}

export function UserDetailsView({ 
  user, 
  context,
  onUserUpdate,
  onUserAction 
}: UserDetailsViewProps) {
  const [error, setError] = useState<string | null>(null);

  const handleSuspend = async () => {
    try {
      setError(null);
      await onUserAction?.('suspend', user);
    } catch (err) {
      setError('Failed to suspend user. Please try again.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle>{user.fullName}</CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{user.email}</span>
                <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                  {user.status}
                </Badge>
                <Badge variant="outline">
                  {user.type === 'internal' ? 'Internal' : 'External'}
                </Badge>
                {user.type === 'external' && (
                  <Badge variant="outline">
                    {user.organizationName}
                  </Badge>
                )}
              </div>
            </div>
            <Button 
              variant="destructive"
              onClick={handleSuspend}
              disabled={user.status === 'suspended'}
            >
              {user.status === 'active' ? 'Suspend User' : 'Suspended'}
            </Button>
          </div>
        </CardHeader>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Tabs */}
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <UserProfileForm 
            user={user}
            context={context}
            onSubmit={onUserUpdate}
          />
        </TabsContent>

        <TabsContent value="security">
          <UserSecuritySettings 
            user={user}
            context={context}
            onAction={onUserAction}
          />
        </TabsContent>

        <TabsContent value="permissions">
          <UserPermissionsView 
            user={user}
            context={context}
            onUpdate={onUserUpdate}
          />
        </TabsContent>

        <TabsContent value="activity">
          <UserActivityLog userId={user.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}