"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { TeamList } from "./team-list";
import { TeamFilters } from "./team-filters";
import { InviteTeamMemberDialog } from "./invite-team-member-dialog";

interface TeamContentProps {
  initialTeam: any[];
}

export function TeamContent({ initialTeam }: TeamContentProps) {
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search team members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[300px]"
          />
          <TeamFilters />
        </div>
        <Button onClick={() => setInviteDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Invite Member
        </Button>
      </div>

      <TeamList members={initialTeam} searchQuery={searchQuery} />

      <InviteTeamMemberDialog 
        open={inviteDialogOpen} 
        onOpenChange={setInviteDialogOpen}
      />
    </>
  );
}