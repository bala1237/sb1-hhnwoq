"use client";

import { UserNav } from "@/components/org/user-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Badge } from "@/components/ui/badge";

export function TopNav() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Acme Corp</h2>
          <Badge>Enterprise Plan</Badge>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </div>
  );
}