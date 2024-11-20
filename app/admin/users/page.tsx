import { Suspense } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { UserList } from "@/components/shared/users/user-list";
import { CreateUserDialog } from "@/components/shared/users/create-user-dialog";
import { LoadingSpinner } from "@/components/shared/loading-spinner";
import { notFound } from "next/navigation";
import { UserContent } from "@/components/admin/users/user-content";

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
  try {
    // Fetch users data
    const response = await fetch('http://localhost:3000/api/admin/users', {
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
      throw new Error(`Failed to fetch users: ${response.statusText}`);
    }

    const initialUsers = await response.json();

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Users</h3>
          <p className="text-sm text-muted-foreground">
            Manage all internal and external users
          </p>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <UserContent initialUsers={initialUsers} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('Error loading users:', error);
    throw error;
  }
}