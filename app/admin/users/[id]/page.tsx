import { Suspense } from "react";
import { getUser } from "@/lib/api/admin/users";
import { UserDetailsView } from "@/components/shared/users/user-details-view";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic'; // Disable static page generation

export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await getUser(params.id);

  if (!user) {
    notFound();
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <UserDetailsView 
        user={user}
        context="admin"
      />
    </Suspense>
  );
}