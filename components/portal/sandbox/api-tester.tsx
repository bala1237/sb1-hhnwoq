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
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Predefined sandbox endpoints
const SANDBOX_ENDPOINTS = {
  accounts: [
    {
      id: "list-accounts",
      method: "GET",
      path: "/sandbox/v1/accounts",
      description: "List all accounts",
      parameters: [],
      responses: {
        "200": {
          description: "Success",
          example: {
            accounts: [
              {
                id: "acc_123",
                type: "current",
                balance: 1000.00,
                currency: "GBP"
              }
            ]
          }
        }
      }
    },
    {
      id: "get-account",
      method: "GET",
      path: "/sandbox/v1/accounts/{accountId}",
      description: "Get account details",
      parameters: [
        {
          name: "accountId",
          type: "path",
          required: true
        }
      ],
      responses: {
        "200": {
          description: "Success",
          example: {
            id: "acc_123",
            type: "current",
            balance: 1000.00,
            currency: "GBP"
          }
        }
      }
    }
  ],
  payments: [
    {
      id: "create-payment",
      method: "POST",
      path: "/sandbox/v1/payments",
      description: "Create a new payment",
      parameters: [],
      requestBody: {
        type: "json",
        example: {
          amount: 100.00,
          currency: "GBP",
          beneficiary: {
            name: "John Doe",
            accountNumber: "12345678",
            sortCode: "12-34-56"
          }
        }
      },
      responses: {
        "201": {
          description: "Payment created",
          example: {
            id: "pmt_123",
            status: "pending",
            amount: 100.00
          }
        }
      }
    }
  ],
  balances: [
    {
      id: "get-balances",
      method: "GET",
      path: "/sandbox/v1/balances",
      description: "Get account balances",
      parameters: [],
      responses: {
        "200": {
          description: "Success",
          example: {
            balances: [
              {
                accountId: "acc_123",
                amount: 1000.00,
                currency: "GBP"
              }
            ]
          }
        }
      }
    }
  ]
};

export function ApiTester() {
  const [selectedCategory, setSelectedCategory] = useState<string>("accounts");
  const [selectedEndpoint, setSelectedEndpoint] = useState<string>("");
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleTest = async () => {
    const endpoint = Object.values(SANDBOX_ENDPOINTS[selectedCategory])
      .find(e => e.id === selectedEndpoint);

    if (!endpoint) return;

    setLoading(true);
    try {
      // Simulate API call with mock response
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResponse({
        status: endpoint.method === "POST" ? 201 : 200,
        headers: {
          "content-type": "application/json",
          "x-request-id": `req_${Date.now()}`,
          "x-ratelimit-limit": "100",
          "x-ratelimit-remaining": "99"
        },
        data: Object.values(endpoint.responses)[0].example
      });
    } catch (error) {
      setResponse({
        status: 500,
        error: "Internal Server Error"
      });
    } finally {
      setLoading(false);
    }
  };

  const selectedEndpointDetails = selectedEndpoint ? 
    Object.values(SANDBOX_ENDPOINTS[selectedCategory])
      .find(e => e.id === selectedEndpoint) : null;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Request</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* API Category Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">API Category</label>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="accounts">Accounts</SelectItem>
                <SelectItem value="payments">Payments</SelectItem>
                <SelectItem value="balances">Balances</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Endpoint Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Endpoint</label>
            <Select value={selectedEndpoint} onValueChange={setSelectedEndpoint}>
              <SelectTrigger>
                <SelectValue placeholder="Select endpoint" />
              </SelectTrigger>
              <SelectContent>
                {SANDBOX_ENDPOINTS[selectedCategory].map((endpoint) => (
                  <SelectItem key={endpoint.id} value={endpoint.id}>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{endpoint.method}</Badge>
                      <span>{endpoint.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Endpoint Details */}
          {selectedEndpointDetails && (
            <div className="space-y-4">
              <div className="rounded-md bg-muted p-4">
                <p className="text-sm font-medium">{selectedEndpointDetails.path}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedEndpointDetails.description}
                </p>
              </div>

              {/* Parameters */}
              {selectedEndpointDetails.parameters.length > 0 && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Parameters</label>
                  {selectedEndpointDetails.parameters.map((param) => (
                    <div key={param.name} className="space-y-1">
                      <label className="text-sm">{param.name}</label>
                      <input
                        type="text"
                        className="w-full rounded-md border p-2"
                        placeholder={`Enter ${param.name}`}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Request Body */}
              {selectedEndpointDetails.requestBody && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Request Body</label>
                  <CodeBlock
                    code={JSON.stringify(selectedEndpointDetails.requestBody.example, null, 2)}
                    language="json"
                  />
                </div>
              )}
            </div>
          )}

          <Button 
            onClick={handleTest} 
            disabled={!selectedEndpoint || loading}
            className="w-full"
          >
            {loading ? "Sending Request..." : "Send Request"}
          </Button>
        </CardContent>
      </Card>

      {/* Response Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Response</CardTitle>
        </CardHeader>
        <CardContent>
          {response ? (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Status:</span>
                <Badge
                  variant={response.status < 400 ? "default" : "destructive"}
                >
                  {response.status}
                </Badge>
              </div>

              {response.headers && (
                <div className="space-y-2">
                  <span className="text-sm font-medium">Headers:</span>
                  <CodeBlock
                    code={JSON.stringify(response.headers, null, 2)}
                    language="json"
                  />
                </div>
              )}

              <div className="space-y-2">
                <span className="text-sm font-medium">Body:</span>
                <CodeBlock
                  code={JSON.stringify(response.data || response.error, null, 2)}
                  language="json"
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[400px] text-muted-foreground">
              Response will appear here
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}