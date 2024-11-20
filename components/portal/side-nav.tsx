"use client";

import { cn } from "@/lib/utils";
import {
  BarChart,
  LifeBuoy,
  Settings,
  Key,
  TestTubes
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFeatures } from "@/lib/hooks/use-features";

const getRoutes = (isModuleEnabled: (module: string, submodule?: string) => boolean) => [
  {
    label: "API Keys",
    icon: Key,
    href: "/portal/api-keys",
    color: "text-violet-500",
    enabled: isModuleEnabled('portal', 'api-keys')
  },
  {
    label: "Sandbox",
    icon: TestTubes,
    href: "/portal/sandbox",
    color: "text-emerald-500",
    enabled: isModuleEnabled('portal', 'sandbox')
  },
  {
    label: "Usage",
    icon: BarChart,
    href: "/portal/usage",
    color: "text-orange-700",
    enabled: isModuleEnabled('portal', 'usage')
  },
  {
    label: "Support",
    icon: LifeBuoy,
    href: "/portal/support",
    color: "text-blue-500",
    enabled: isModuleEnabled('portal', 'support')
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/portal/settings",
    color: "text-gray-700",
    enabled: isModuleEnabled('portal', 'settings')
  }
];

export function SideNav() {
  const pathname = usePathname();
  const { isModuleEnabled } = useFeatures();
  const routes = getRoutes(isModuleEnabled);

  return (
    <div className="h-screen border-r bg-background">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <Link href="/portal">
            <h2 className="text-xl font-bold">Developer Portal</h2>
          </Link>
        </div>
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {routes.filter(route => route.enabled).map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                "hover:bg-muted",
                pathname === route.href 
                  ? "bg-muted text-primary" 
                  : "text-foreground/60"
              )}
            >
              <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
              {route.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}