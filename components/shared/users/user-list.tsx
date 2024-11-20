"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@/lib/types/users";

interface UserListProps {
  users: User[];
  searchQuery: string;
  context: 'admin' | 'enterprise';
  onUserAction?: (action: string, user: User) => void;
}

export function UserList({ users, searchQuery, context, onUserAction }: UserListProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);

  const filteredUsers = users.filter(user => 
    user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ('organizationName' in user && user.organizationName.toLowerCase().includes(searchQuery.toLowerCase())) ||
    ('department' in user && user.department?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAction = async (action: string, user: User) => {
    try {
      setLoading(action);
      await onUserAction?.(action, user);
      toast({
        title: "Success",
        description: `Action ${action} completed successfully`,
      });
    } catch (error) {
      console.error(`Error performing action ${action}:`, error);
      toast({
        title: "Error",
        description: `Failed to perform action ${action}`,
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  if (!users.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <p className="text-muted-foreground">No users found</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Role</TableHead>
          {context === 'admin' && <TableHead>Type</TableHead>}
          <TableHead>{context === 'admin' ? 'Organization/Department' : 'Department'}</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Active</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filteredUsers.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`https://avatar.vercel.sh/${user.id}`} alt={user.fullName} />
                  <AvatarFallback>
                    {user.fullName.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{user.fullName}</div>
                  <div className="text-sm text-muted-foreground">
                    {user.email}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge variant="outline">
                {user.role.split('_').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </Badge>
            </TableCell>
            {context === 'admin' && (
              <TableCell>
                <Badge variant="outline">
                  {user.type === 'internal' ? 'Internal' : 'External'}
                </Badge>
              </TableCell>
            )}
            <TableCell>
              {user.type === 'internal' 
                ? user.department 
                : user.organizationName}
            </TableCell>
            <TableCell>
              <Badge
                variant={user.status === "active" ? "default" : "secondary"}
              >
                {user.status}
              </Badge>
            </TableCell>
            <TableCell>{user.lastActive}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem asChild>
                    <Link href={`/${context}/users/${user.id}`}>
                      View details
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAction('edit', user)}>
                    Edit user
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleAction('change_role', user)}>
                    Change role
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleAction('reset_password', user)}>
                    Reset password
                  </DropdownMenuItem>
                  {user.type === 'internal' && (
                    <DropdownMenuItem onClick={() => handleAction('reset_2fa', user)}>
                      Reset 2FA
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="text-destructive"
                    onClick={() => handleAction('suspend', user)}
                    disabled={loading === 'suspend'}
                  >
                    {loading === 'suspend' ? 'Suspending...' : 'Suspend user'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}