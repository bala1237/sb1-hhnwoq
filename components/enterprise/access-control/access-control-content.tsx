"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RolesList } from "./roles-list";
import { PolicyList } from "./policy-list";
import { AuditLog } from "./audit-log";

interface AccessControlContentProps {
  initialData: {
    roles: any[];
    policies: any[];
    auditLogs: any[];
  };
}

export function AccessControlContent({ initialData }: AccessControlContentProps) {
  return (
    <Tabs defaultValue="roles" className="space-y-4">
      <TabsList>
        <TabsTrigger value="roles">Roles</TabsTrigger>
        <TabsTrigger value="policies">Policies</TabsTrigger>
        <TabsTrigger value="audit">Audit Log</TabsTrigger>
      </TabsList>

      <TabsContent value="roles">
        <RolesList roles={initialData.roles} />
      </TabsContent>

      <TabsContent value="policies">
        <PolicyList policies={initialData.policies} />
      </TabsContent>

      <TabsContent value="audit">
        <AuditLog logs={initialData.auditLogs} />
      </TabsContent>
    </Tabs>
  );
}