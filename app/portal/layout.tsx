import { Metadata } from "next";
import { SideNav } from "@/components/portal/side-nav";
import { TopNav } from "@/components/portal/top-nav";
import { FeatureGuard } from "@/components/feature-guard";

export const metadata: Metadata = {
  title: "Developer Portal",
  description: "API Documentation and Resources",
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <div className="w-64 flex-none">
        <SideNav />
      </div>
      <div className="flex-1">
        <TopNav />
        <main className="p-8">
          <FeatureGuard 
            module="portal"
            fallback={
              <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
                <div className="text-center">
                  <h2 className="text-2xl font-bold">Portal Access Restricted</h2>
                  <p className="text-muted-foreground mt-2">
                    You don't have access to this feature.
                  </p>
                </div>
              </div>
            }
          >
            {children}
          </FeatureGuard>
        </main>
      </div>
    </div>
  );
}