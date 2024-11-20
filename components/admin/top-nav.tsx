"use client";

import { UserNav } from "@/components/admin/user-nav";
import { ModeToggle } from "@/components/mode-toggle";

export function TopNav() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 gap-4">
        <div className="ml-auto flex items-center space-x-4">
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </div>
  );
}