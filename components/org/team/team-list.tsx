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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { ViewMemberDialog } from "./view-member-dialog";
import { EditRoleDialog } from "./edit-role-dialog";
import { RemoveMemberDialog } from "./remove-member-dialog";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
  avatar: string;
  permissions?: string[];
  joinedAt?: string;
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@acme.com",
    role: "Admin",
    status: "Active",
    lastActive: "2 hours ago",
    avatar: "/avatars/01.png",
    permissions: ["Full Access", "API Management", "Team Management"],
    joinedAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@acme.com",
    role: "Developer",
    status: "Active",
    lastActive: "5 minutes ago",
    avatar: "/avatars/02.png",
    permissions: ["API Access", "Documentation Access"],
    joinedAt: "2024-02-01",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@acme.com",
    role: "Developer",
    status: "Inactive",
    lastActive: "2 days ago",
    avatar: "/avatars/03.png",
    permissions: ["API Access", "Documentation Access"],
    joinedAt: "2024-01-20",
  },
];

export function TeamList() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editRoleDialogOpen, setEditRoleDialogOpen] = useState(false);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);

  const handleViewMember = (member: TeamMember) => {
    setSelectedMember(member);
    setViewDialogOpen(true);
  };

  const handleEditRole = (member: TeamMember) => {
    setSelectedMember(member);
    setEditRoleDialogOpen(true);
  };

  const handleRemoveMember = (member: TeamMember) => {
    setSelectedMember(member);
    setRemoveDialogOpen(true);
  };

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Member</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>
                        {member.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <button
                        onClick={() => handleViewMember(member)}
                        className="font-medium hover:underline text-left"
                      >
                        {member.name}
                      </button>
                      <div className="text-sm text-muted-foreground">
                        {member.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{member.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={member.status === "Active" ? "default" : "secondary"}
                  >
                    {member.status}
                  </Badge>
                </TableCell>
                <TableCell>{member.lastActive}</TableCell>
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
                      <DropdownMenuItem onClick={() => handleViewMember(member)}>
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditRole(member)}>
                        Edit role
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => handleRemoveMember(member)}
                      >
                        Remove member
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {selectedMember && (
        <>
          <ViewMemberDialog
            member={selectedMember}
            open={viewDialogOpen}
            onOpenChange={setViewDialogOpen}
          />
          <EditRoleDialog
            member={selectedMember}
            open={editRoleDialogOpen}
            onOpenChange={setEditRoleDialogOpen}
            onRoleUpdate={(newRole) => {
              // Handle role update
              console.log(`Updating ${selectedMember.name}'s role to ${newRole}`);
              setEditRoleDialogOpen(false);
            }}
          />
          <RemoveMemberDialog
            member={selectedMember}
            open={removeDialogOpen}
            onOpenChange={setRemoveDialogOpen}
            onConfirm={() => {
              // Handle member removal
              console.log(`Removing team member: ${selectedMember.name}`);
              setRemoveDialogOpen(false);
            }}
          />
        </>
      )}
    </>
  );
}