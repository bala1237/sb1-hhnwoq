"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { UserList } from "@/components/shared/users/user-list";
import { CreateUserDialog } from "@/components/shared/users/create-user-dialog";
import { useToast } from "@/components/ui/use-toast";

interface OrganizationUsersContentProps {
  organizationId: string;
  initialUsers: any[];
}

export function OrganizationUsersContent({ 
  organizationId,
  initialUsers 
}: OrganizationUsersContentProps) {
  const [users, setUsers] = useState(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleUserAction = async (action: string, user: any) => {
    try {
      const response = await fetch(`/api/organizations/${organizationId}/users/${user.id}/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error('Failed to perform action');
      }

      // Update local state based on action
      switch (action) {
        case 'suspend':
          setUsers(prev => prev.map(u => 
            u.id === user.id ? { ...u, status: 'suspended' } : u
          ));
          break;
        case 'activate':
          setUsers(prev => prev.map(u => 
            u.id === user.id ? { ...u, status: 'active' } : u
          ));
          break;
        // Add other actions as needed
      }

      toast({
        title: "Success",
        description: `User ${action} successful`,
      });
    } catch (error) {
      console.error(`Error performing action ${action}:`, error);
      toast({
        title: "Error",
        description: `Failed to ${action} user`,
        variant: "destructive",
      });
    }
  };

  const handleCreateUser = async (data: any) => {
    try {
      const response = await fetch(`/api/organizations/${organizationId}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      const newUser = await response.json();
      setUsers(prev => [...prev, newUser]);
      setCreateDialogOpen(false);
      
      toast({
        title: "Success",
        description: "User created successfully",
      });
    } catch (error) {
      console.error('Error creating user:', error);
      toast({
        title: "Error",
        description: "Failed to create user",
        variant: "destructive",
      });
    }
  };

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

        <UserList 
          users={users}
          searchQuery={searchQuery}
          context="organization"
          onUserAction={handleUserAction}
        />

        <CreateUserDialog 
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
          onSubmit={handleCreateUser}
          context="organization"
          organizationId={organizationId}
        />
      </CardContent>
    </Card>
  );
}