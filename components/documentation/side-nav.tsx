"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const docs = [
  {
    title: "Getting Started",
    href: "/documentation/getting-started",
  },
  {
    title: "Architecture & Design",
    href: "/documentation/architecture",
  },
  {
    title: "Module Documentation",
    href: "/documentation/modules",
  },
  {
    title: "Authentication & Security",
    href: "/documentation/authentication",
  },
  {
    title: "Server-Side Rendering",
    href: "/documentation/ssr",
  },
  {
    title: "Client Components",
    href: "/documentation/client-components",
  },
  {
    title: "Environment Variables",
    href: "/documentation/env-variables",
  },
  {
    title: "Application Routes",
    href: "/documentation/routes",
  },
  {
    title: "Feature Management",
    href: "/documentation/features",
  },
  {
    title: "White Label System",
    href: "/documentation/white-label",
  },
  {
    title: "API Integration",
    href: "/documentation/api-integration",
  },
  {
    title: "API Reference",
    href: "/documentation/reference",
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
