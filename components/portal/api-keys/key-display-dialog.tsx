"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Copy, Eye, EyeOff, Download, AlertTriangle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface KeyDisplayDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  keyDetails: {
    clientId: string;
    clientSecret: string;
    keyType: string;
    environment: string;
    expiresAt?: string;
  } | null;
}

export function KeyDisplayDialog({
  open,
  onOpenChange,
  keyDetails
}: KeyDisplayDialogProps) {
  const [showSecret, setShowSecret] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const { toast } = useToast();

  if (!keyDetails) return null;

  const copyToClipboard = async (value: string, field: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      toast({
        title: "Copied to clipboard",
        description: `${field} has been copied to your clipboard.`,
        duration: 2000,
      });
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy to clipboard.",
        variant: "destructive",
      });
    }
  };

  const downloadCredentials = () => {
    const data = {
      clientId: keyDetails.clientId,
      clientSecret: keyDetails.clientSecret,
      type: keyDetails.keyType,
      environment: keyDetails.environment,
      expiresAt: keyDetails.expiresAt,
      generatedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `api-credentials-${keyDetails.environment}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>API Credentials Generated</DialogTitle>
          <DialogDescription>
            Store these credentials securely. The client secret will not be shown again.
          </DialogDescription>
        </DialogHeader>

        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Make sure to copy your client secret now. You won't be able to see it again!
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Client ID</label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(keyDetails.clientId, 'Client ID')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <code className="flex-1 rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  {keyDetails.clientId}
                </code>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Client Secret</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSecret(!showSecret)}
                  >
                    {showSecret ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(keyDetails.clientSecret, 'Client Secret')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <code className="flex-1 rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  {showSecret ? keyDetails.clientSecret : '••••••••••••••••••••••••••'}
                </code>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Badge variant="outline">{keyDetails.keyType}</Badge>
            <Badge variant="outline">{keyDetails.environment}</Badge>
            {keyDetails.expiresAt && (
              <span>Expires: {keyDetails.expiresAt}</span>
            )}
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Quick Setup</h4>
            <div className="rounded-md bg-muted p-4">
              <pre className="text-sm"><code>{`
// Initialize the client
const client = new ApiClient({
  clientId: '${keyDetails.clientId}',
  clientSecret: '${showSecret ? keyDetails.clientSecret : '**********'}',
  environment: '${keyDetails.environment}'
});
              `.trim()}</code></pre>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={downloadCredentials}>
            <Download className="mr-2 h-4 w-4" />
            Download Credentials
          </Button>
          <Button onClick={() => onOpenChange(false)}>
            I've Saved My Credentials
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}