"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface FlowDiagramProps {
  flowType: string;
  currentStep: number;
}

export function FlowDiagram({ flowType, currentStep }: FlowDiagramProps) {
  const steps = {
    authorization_code: [
      { 
        id: 1, 
        label: "Authorization Request",
        server: "client",
        description: "Client redirects to authorization server"
      },
      { 
        id: 2, 
        label: "User Consent",
        server: "auth",
        description: "User approves requested permissions" 
      },
      { 
        id: 3, 
        label: "Authorization Code",
        server: "auth",
        description: "Server returns temporary code" 
      },
      { 
        id: 4, 
        label: "Token Exchange",
        server: "backend",
        description: "Backend exchanges code for tokens" 
      },
      { 
        id: 5, 
        label: "Access Token",
        server: "backend",
        description: "Tokens returned to client securely" 
      }
    ],
    client_credentials: [
      { 
        id: 1, 
        label: "Client Authentication",
        server: "backend",
        description: "Backend validates credentials"
      },
      { 
        id: 2, 
        label: "Token Request",
        server: "backend",
        description: "Backend requests access token"
      },
      { 
        id: 3, 
        label: "Access Token",
        server: "backend",
        description: "Token returned to client"
      }
    ],
    refresh_token: [
      { 
        id: 1, 
        label: "Refresh Token Request",
        server: "backend",
        description: "Backend sends refresh token"
      },
      { 
        id: 2, 
        label: "Token Validation",
        server: "auth",
        description: "Server validates refresh token"
      },
      { 
        id: 3, 
        label: "New Access Token",
        server: "backend",
        description: "New tokens returned to client"
      }
    ]
  };

  const currentSteps = steps[flowType as keyof typeof steps];

  return (
    <div className="space-y-4">
      {currentSteps.map((step, index) => (
        <div
          key={step.id}
          className="flex items-center gap-4"
        >
          <div
            className={cn(
              "h-8 w-8 rounded-full flex items-center justify-center",
              step.id <= currentStep
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            {step.id}
          </div>
          <div
            className={cn(
              "flex-1 p-4 rounded-lg border space-y-2",
              step.id === currentStep
                ? "border-primary bg-primary/5"
                : "border-border"
            )}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{step.label}</span>
              <Badge variant={getServerBadgeVariant(step.server)}>
                {getServerLabel(step.server)}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {step.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function getServerBadgeVariant(server: string): "default" | "secondary" | "outline" {
  switch (server) {
    case "client":
      return "default";
    case "auth":
      return "secondary";
    case "backend":
      return "outline";
    default:
      return "default";
  }
}

function getServerLabel(server: string): string {
  switch (server) {
    case "client":
      return "Frontend";
    case "auth":
      return "Auth Server";
    case "backend":
      return "Backend";
    default:
      return server;
  }
}