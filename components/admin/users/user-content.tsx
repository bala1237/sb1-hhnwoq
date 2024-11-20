"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { UserList } from "@/components/shared/users/user-list";
import { CreateUserDialog } from "@/components/shared/users/create-user-dialog";

interface UserContentProps {
  initialUsers: any[];
}

export function UserContent({ initialUsers }: UserContentProps) {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Search users..."
              className="w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        <Tabs defaultValue="internal">
          <TabsList>
            <TabsTrigger value="internal">Internal Users</TabsTrigger>
            <TabsTrigger value="external">External Users</TabsTrigger>
          </TabsList>

          <TabsContent value="internal">
            <UserList 
              users={initialUsers.filter(u => u.type === 'internal')}
              searchQuery={searchQuery}
              context="admin"
            />
          </TabsContent>

          <TabsContent value="external">
            <UserList 
              users={initialUsers.filter(u => u.type === 'external')}
              searchQuery={searchQuery}
              context="admin"
            />
          </TabsContent>
        </Tabs>

        <CreateUserDialog 
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
          context="admin"
        />
      </CardContent>
    </Card>
  );
}