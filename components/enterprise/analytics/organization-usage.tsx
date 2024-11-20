"use client";

import { Progress } from "@/components/ui/progress";

const organizations = [
  {
    name: "Acme Corp",
    usage: 85,
    limit: 100,
    color: "bg-blue-500",
  },
  {
    name: "TechStart Inc",
    usage: 45,
    limit: 75,
    color: "bg-green-500",
  },
  {
    name: "DevCo Labs",
    usage: 28,
    limit: 50,
    color: "bg-purple-500",
  },
  {
    name: "InnoSys",
    usage: 62,
    limit: 100,
    color: "bg-orange-500",
  },
  {
    name: "CloudTech",
    usage: 15,
    limit: 25,
    color: "bg-pink-500",
  },
];

export function OrganizationUsage() {
  return (
    <div className="space-y-8">
      {organizations.map((org) => (
        <div key={org.name} className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">{org.name}</p>
              <p className="text-sm text-muted-foreground">
                {org.usage}M / {org.limit}M API calls
              </p>
            </div>
            <span className="text-sm text-muted-foreground">
              {Math.round((org.usage / org.limit) * 100)}%
            </span>
          </div>
          <Progress
            value={(org.usage / org.limit) * 100}
            className={org.color}
          />
        </div>
      ))}
    </div>
  );
}