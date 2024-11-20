"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Key } from "lucide-react";
import { ViewApiKeys } from "./view-api-keys";
import { CreateApiKeyDialog } from "./create-api-key-dialog";

interface ApiKeysContentProps {
  initialApiKeys: any[];
}

export function ApiKeysContent({ initialApiKeys }: ApiKeysContentProps) {
  const [apiKeys, setApiKeys] = useState(initialApiKeys);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const userRole = "developer"; // This would come from auth context

  const handleCreateSuccess = (newKey: any) => {
    setApiKeys(prev => [...prev, newKey]);
    setCreateDialogOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Active API Keys</CardTitle>
          {userRole === "developer" && (
            <Button onClick={() => setCreateDialogOpen(true)}>
              <Key className="mr-2 h-4 w-4" />
              Create API Key
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ViewApiKeys userRole={userRole} apiKeys={apiKeys} />
      </CardContent>

      <CreateApiKeyDialog 
        open={createDialogOpen} 
        onOpenChange={setCreateDialogOpen}
        onSuccess={handleCreateSuccess}
      />
    </Card>
  );
}