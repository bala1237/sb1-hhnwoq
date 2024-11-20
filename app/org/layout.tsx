import { Metadata } from "next";
import { SideNav } from "@/components/org/side-nav";
import { TopNav } from "@/components/org/top-nav";

export const metadata: Metadata = {
  title: "Organization Admin",
  description: "Organization Administration Dashboard",
};

export default function OrgLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <SideNav />
      <div className="flex-1">
        <TopNav />
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}