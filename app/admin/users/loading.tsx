import { LoadingUsers } from "@/components/shared/loading-users";

export default function Loading() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Users</h3>
        <p className="text-sm text-muted-foreground">
          Manage all internal and external users
        </p>
      </div>
      <LoadingUsers />
    </div>
  );
}