import { Metadata } from "next";
import { SideNav } from "@/components/admin/side-nav";
import { TopNav } from "@/components/admin/top-nav";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Enterprise Developer Portal Administration",
};

export default function AdminLayout({
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