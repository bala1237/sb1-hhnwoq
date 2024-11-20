"use client";

import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Settings,
  Shield,
  Palette,
  BarChart,
  Sliders,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Analytics",
    icon: BarChart,
    href: "/admin/analytics",
    color: "text-violet-500",
  },
  {
    label: "Users",
    icon: Users,
    href: "/admin/users",
    color: "text-pink-700",
  },
  {
    label: "Roles",
    icon: Shield,
    href: "/admin/roles",
    color: "text-orange-700",
  },
  {
    label: "Features",
    icon: Sliders,
    href: "/admin/features",
    color: "text-blue-500",
  },
  {
    label: "White Label",
    icon: Palette,
    href: "/admin/white-label",
    color: "text-emerald-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/admin/settings",
    color: "text-gray-700",
  },
];

export function SideNav() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-screen bg-gray-50 dark:bg-gray-900 border-r">
      <div className="px-3 py-2 flex-1">
        <Link href="/admin/dashboard">
          <div className="relative h-8 w-8 mr-4 flex items-center mb-8">
            <h2 className="text-xl font-bold">Admin</h2>
          </div>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition",
                pathname === route.href ? "bg-gray-100 dark:bg-gray-800" : ""
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}