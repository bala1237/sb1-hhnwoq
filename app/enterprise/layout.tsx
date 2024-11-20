import { Metadata } from "next";
import { SideNav } from "@/components/enterprise/side-nav";
import { TopNav } from "@/components/enterprise/top-nav";

export const metadata: Metadata = {
  title: "Enterprise Admin",
  description: "Enterprise Administration Dashboard",
};

export default function EnterpriseLayout({
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