import { Suspense } from "react";
import { UserDetailsView } from "@/components/shared/users/user-details-view";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { notFound } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function UserPage({ params }: { params: { id: string } }) {
  try {
    // Fetch user data
    const response = await fetch(`http://localhost:3000/api/enterprise/users/${params.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      if (response.status === 404) {
        notFound();
      }
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }

    const user = await response.json();

    return (
      <Suspense fallback={<LoadingSpinner />}>
        <UserDetailsView 
          user={user}
          context="enterprise"
        />
      </Suspense>
    );
  } catch (error) {
    console.error('Error loading user:', error);
    throw error;
  }
}