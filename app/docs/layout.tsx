import { Metadata } from "next";
import { SideNav } from "@/components/docs/side-nav";

export const metadata: Metadata = {
  title: "Documentation",
  description: "Enterprise Developer Portal Documentation",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <SideNav />
      <div className="flex-1 px-8 py-6">
        <div className="mx-auto max-w-4xl">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}