"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const docs = [
  {
    title: "Getting Started",
    href: "/docs",
  },
  {
    title: "Feature Management",
    href: "/docs/features",
  },
  {
    title: "White Label System",
    href: "/docs/white-label",
  },
  {
    title: "API Integration",
    href: "/docs/api-integration",
  },
  {
    title: "API Reference",
    href: "/reference",
  }
];

export function SideNav() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r bg-background min-h-screen">
      <ScrollArea className="h-full py-6 pl-4 pr-6">
        <h2 className="font-semibold mb-4 px-2">Documentation</h2>
        <div className="space-y-1">
          {docs.map((doc) => (
            <Button
              key={doc.href}
              variant="ghost"
              className={cn(
                "w-full justify-start",
                pathname === doc.href && "bg-muted"
              )}
              asChild
            >
              <Link href={doc.href}>{doc.title}</Link>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}