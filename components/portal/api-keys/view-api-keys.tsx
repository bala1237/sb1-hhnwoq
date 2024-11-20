"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Copy, Eye, EyeOff } from "lucide-react";
import { RevokeKeyDialog } from "./revoke-key-dialog";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

interface ViewApiKeysProps {
  userRole: string;
  apiKeys: any[];
}

export function ViewApiKeys({ userRole, apiKeys }: ViewApiKeysProps) {
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [revokeDialogOpen, setRevokeDialogOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState<any>(null);
  const { toast } = useToast();

  const toggleKeyVisibility = (keyId: string) => {
    setVisibleKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const copyToClipboard = async (key: string, keyId: string) => {
    try {
      await navigator.clipboard.writeText(key);
      setCopiedKey(keyId);
      toast({
        title: "API key copied",
        description: "The API key has been copied to your clipboard.",
        duration: 2000,
      });
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy the API key to clipboard.",
        variant: "destructive",
      });
    }
  };

  const handleRevoke = async (keyId: string) => {
    try {
      const response = await fetch(`/api/portal/api-keys/${keyId}/revoke`, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to revoke API key');
      }

      toast({
        title: "API key revoked",
        description: "The API key has been successfully revoked.",
      });
      setRevokeDialogOpen(false);
    } catch (err) {
      toast({
        title: "Failed to revoke",
        description: "Could not revoke the API key. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>API Key</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Last Used</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {apiKeys.map((apiKey) => (
            <TableRow key={apiKey.id}>
              <TableCell className="font-medium">{apiKey.name}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                    {visibleKeys[apiKey.id] ? apiKey.fullKey : apiKey.key}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(
                      visibleKeys[apiKey.id] ? apiKey.fullKey : apiKey.key,
                      apiKey.id
                    )}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
              <TableCell>{apiKey.created}</TableCell>
              <TableCell>{apiKey.lastUsed}</TableCell>
              <TableCell>
                <Badge
                  variant={apiKey.status === "active" ? "default" : "secondary"}
                >
                  {apiKey.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => toggleKeyVisibility(apiKey.id)}>
                      <div className="flex items-center">
                        {visibleKeys[apiKey.id] ? (
                          <>
                            <EyeOff className="mr-2 h-4 w-4" />
                            Hide key
                          </>
                        ) : (
                          <>
                            <Eye className="mr-2 h-4 w-4" />
                            Show full key
                          </>
                        )}
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => copyToClipboard(
                        visibleKeys[apiKey.id] ? apiKey.fullKey : apiKey.key,
                        apiKey.id
                      )}
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copy key
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/portal/usage?apiKey=${apiKey.id}`}>
                        View usage
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {apiKey.status === "active" && (
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => {
                          setSelectedKey(apiKey);
                          setRevokeDialogOpen(true);
                        }}
                      >
                        Revoke key
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <RevokeKeyDialog
        open={revokeDialogOpen}
        onOpenChange={setRevokeDialogOpen}
        apiKey={selectedKey}
        onRevoke={() => selectedKey && handleRevoke(selectedKey.id)}
      />
    </>
  );
}