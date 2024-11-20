"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { UserList } from "@/components/shared/users/user-list";
import { CreateUserDialog } from "@/components/shared/users/create-user-dialog";

interface EnterpriseUserContentProps {
  initialUsers: any[];
}

export function EnterpriseUserContent({ initialUsers }: EnterpriseUserContentProps) {
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

        <UserList 
          users={initialUsers}
          searchQuery={searchQuery}
          context="enterprise"
        />

        <CreateUserDialog 
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
          userType="internal"
          context="enterprise"
        />
      </CardContent>
    </Card>
  );
}