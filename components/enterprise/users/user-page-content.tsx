"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserDetails } from "@/components/enterprise/users/user-details";
import { UserSecurity } from "@/components/enterprise/users/user-security";
import { UserOrganizations } from "@/components/enterprise/users/user-organizations";

interface UserPageContentProps {
  params: {
    id: string;
  };
}

export function UserPageContent({ params }: UserPageContentProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/avatars/01.png" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">John Doe</h2>
                <Badge>Enterprise Admin</Badge>
              </div>
              <p className="text-sm text-muted-foreground">john@example.com</p>
            </div>
            <Button variant="outline" className="ml-auto">
              Suspend User
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="organizations">Organizations</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <UserDetails userId={params.id} />
        </TabsContent>

        <TabsContent value="security">
          <UserSecurity userId={params.id} />
        </TabsContent>

        <TabsContent value="organizations">
          <UserOrganizations userId={params.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}