"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/code-block";
import { Loader2, AlertTriangle } from "lucide-react";
import { oauthService } from "@/lib/services/oauth-service";

export function CallbackHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [error, setError] = useState<string | null>(null);
  const [authCode, setAuthCode] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        
        if (!code) {
          throw new Error('No authorization code received');
        }

        // Store the auth code to display in the UI
        setAuthCode(code);

        // Simulate backend token exchange delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        setStatus("success");
      } catch (err) {
        console.error('Error handling callback:', err);
        setError(err.message || 'Failed to process authorization');
        setStatus("error");
      }
    };

    handleCallback();
  }, [searchParams]);

  if (status === "loading") {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Processing authorization code...</p>
        </CardContent>
      </Card>
    );
  }

  if (status === "error") {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <AlertTriangle className="h-8 w-8 text-destructive" />
          <div className="text-center">
            <h3 className="font-semibold">Authorization Failed</h3>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
          <Button onClick={() => router.push('/portal/sandbox')}>
            Return to Sandbox
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Authorization Code Received</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="default">Success</Badge>
            <span className="text-sm text-muted-foreground">
              Authorization code received successfully
            </span>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Authorization Code</h4>
            <CodeBlock
              code={authCode || ""}
              language="text"
            />
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Next Steps</h4>
            <div className="prose prose-sm max-w-none">
              <ol className="list-decimal list-inside space-y-2">
                <li>Use this authorization code in your backend server</li>
                <li>Exchange it for access and refresh tokens</li>
                <li>Store tokens securely in your backend</li>
                <li>Use access token for API requests</li>
              </ol>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              For security reasons, token exchange must be performed server-side. 
              In a real implementation, this code would be sent to your backend server 
              which would then exchange it for tokens using your client secret.
            </p>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={() => router.push('/portal/sandbox')}>
            Return to Sandbox
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}