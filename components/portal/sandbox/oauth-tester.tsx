"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { FlowDiagram } from "./oauth/flow-diagram";
import { ConsentScreen } from "./oauth/consent-screen";
import { LoginScreen } from "./oauth/login-screen";
import { TEST_USERS, type TestUser } from "@/lib/config/test-users";

export function OAuthTester() {
  const [flowType, setFlowType] = useState("authorization_code");
  const [step, setStep] = useState(0); // Start at 0 to show no steps highlighted
  const [showLogin, setShowLogin] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  const [selectedUser, setSelectedUser] = useState<TestUser | null>(null);
  const [backendUrl, setBackendUrl] = useState("");
  const [mode, setMode] = useState<"mock" | "live">("mock");

  const handleStartFlow = () => {
    if (mode === "live" && !backendUrl) {
      return;
    }

    if (flowType === "authorization_code") {
      setStep(1); // Highlight step 1 when starting the flow
      setShowLogin(true);
    } else {
      // Client credentials flow is handled entirely server-side
      setStep(1);
      setTimeout(() => {
        setStep(2);
        setTimeout(() => {
          setStep(3);
        }, 1500);
      }, 1500);
    }
  };

  const handleLogin = (user: TestUser) => {
    setSelectedUser(user);
    setShowLogin(false);
    setStep(2); // Move to step 2 (User Consent) after successful login
    setShowConsent(true);
  };

  const handleConsent = (approved: boolean) => {
    setShowConsent(false);
    if (approved) {
      setStep(3); // Move to step 3 (Authorization Code)
      // Simulate auth code generation
      setTimeout(() => {
        // In live mode, redirect to the backend
        if (mode === "live") {
          window.location.href = `${backendUrl}/oauth/callback?code=auth_${Date.now()}`;
        } else {
          // In mock mode, simulate the flow
          setStep(4); // Token Exchange
          setTimeout(() => {
            setStep(5); // Access Token
          }, 1500);
        }
      }, 1500);
    } else {
      setStep(0); // Reset flow if user denies consent
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>OAuth Flow Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Mode</label>
            <Select value={mode} onValueChange={(value: "mock" | "live") => setMode(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mock">Mock Mode</SelectItem>
                <SelectItem value="live">Live Mode</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {mode === "live" && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Backend URL</label>
              <Input 
                value={backendUrl}
                onChange={(e) => setBackendUrl(e.target.value)}
                placeholder="https://your-backend.com"
              />
              <p className="text-sm text-muted-foreground">
                Your backend server URL that will handle the OAuth flow
              </p>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Flow Type</label>
            <Select value={flowType} onValueChange={setFlowType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="authorization_code">Authorization Code</SelectItem>
                <SelectItem value="client_credentials">Client Credentials</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Client ID</label>
            <Input value="sandbox_client_id" readOnly />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Client Secret</label>
            <Input value="sandbox_client_secret" readOnly type="password" />
          </div>

          {flowType === "authorization_code" && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Redirect URI</label>
              <Input 
                value={mode === "live" 
                  ? `${backendUrl}/oauth/callback` 
                  : "http://localhost:3000/portal/sandbox/callback"
                } 
                readOnly 
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Scopes</label>
            <div className="flex flex-wrap gap-2">
              <Badge>accounts</Badge>
              <Badge>payments</Badge>
              <Badge>balances</Badge>
            </div>
          </div>

          {mode === "live" && !backendUrl && (
            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertDescription>
                Please enter your backend URL to handle the OAuth flow
              </AlertDescription>
            </Alert>
          )}

          <Button 
            onClick={handleStartFlow} 
            className="w-full"
            disabled={mode === "live" && !backendUrl}
          >
            Start OAuth Flow
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Flow Visualization</CardTitle>
        </CardHeader>
        <CardContent>
          <FlowDiagram flowType={flowType} currentStep={step} />
        </CardContent>
      </Card>

      <LoginScreen
        open={showLogin}
        onOpenChange={setShowLogin}
        onSuccess={handleLogin}
      />

      {selectedUser && (
        <ConsentScreen
          open={showConsent}
          onOpenChange={setShowConsent}
          onResponse={handleConsent}
          scopes={["accounts", "payments", "balances"]}
          user={selectedUser}
        />
      )}
    </div>
  );
}