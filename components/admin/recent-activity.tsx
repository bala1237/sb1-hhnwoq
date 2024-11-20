"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const activities = [
  {
    user: { name: "John Doe", email: "john@example.com", image: "/avatars/01.png" },
    action: "Generated new API key",
    time: "2 minutes ago"
  },
  {
    user: { name: "Jane Smith", email: "jane@example.com", image: "/avatars/02.png" },
    action: "Updated documentation",
    time: "1 hour ago"
  },
  {
    user: { name: "Mike Johnson", email: "mike@example.com", image: "/avatars/03.png" },
    action: "Created new sandbox",
    time: "3 hours ago"
  },
  {
    user: { name: "Sarah Wilson", email: "sarah@example.com", image: "/avatars/04.png" },
    action: "Modified rate limits",
    time: "5 hours ago"
  }
];

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.user.image} alt={activity.user.name} />
            <AvatarFallback>{activity.user.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.user.name}</p>
            <p className="text-sm text-muted-foreground">{activity.action}</p>
          </div>
          <div className="ml-auto font-medium text-sm text-muted-foreground">
            {activity.time}
          </div>
        </div>
      ))}
    </div>
  );
}