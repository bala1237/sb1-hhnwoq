"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { UserList } from "@/components/shared/users/user-list";
import { CreateUserDialog } from "@/components/shared/users/create-user-dialog";
import { User } from "@/lib/types/users";

interface UsersContentProps {
  initialUsers: User[];
}

export function UsersContent({ initialUsers }: UsersContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const handleUserAction = async (action: string, user: User) => {
    switch (action) {
      case 'suspend':
        // Handle suspend
        break;
      case 'reset_password':
        // Handle password reset
        break;
      // Handle other actions
    }
  };

  // Only show internal users in enterprise view
  const internalUsers = initialUsers.filter(user => user.type === 'internal');

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <UserList 
        users={internalUsers}
        searchQuery={searchQuery}
        context="enterprise"
        onUserAction={handleUserAction}
      />

      <CreateUserDialog 
        open={createDialogOpen} 
        onOpenChange={setCreateDialogOpen}
        userType="internal"
        context="enterprise"
      />
    </>
  );
}