"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const commonIssues = [
  {
    id: "auth",
    title: "Authentication Issues",
    description: "Common authentication problems and solutions",
    solutions: [
      "Verify API key format and validity",
      "Check authorization headers",
      "Ensure SSL/TLS is properly configured",
      "Validate token expiration",
    ],
    category: "Security",
  },
  {
    id: "rate-limits",
    title: "Rate Limiting",
    description: "Understanding and handling rate limits",
    solutions: [
      "Implement exponential backoff",
      "Monitor rate limit headers",
      "Cache responses when possible",
      "Use bulk endpoints for multiple operations",
    ],
    category: "Performance",
  },
  {
    id: "webhooks",
    title: "Webhook Delivery",
    description: "Troubleshooting webhook integration issues",
    solutions: [
      "Verify endpoint accessibility",
      "Check webhook signatures",
      "Monitor webhook logs",
      "Implement retry logic",
    ],
    category: "Integration",
  },
];

export function TroubleshootingGuide() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {commonIssues.map((issue) => (
          <Card key={issue.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {issue.title}
                <Badge variant="outline">{issue.category}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {issue.description}
              </p>
              <Accordion type="single" collapsible>
                <AccordionItem value="solutions">
                  <AccordionTrigger>Solutions</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2">
                      {issue.solutions.map((solution, index) => (
                        <li key={index} className="text-sm">
                          • {solution}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Diagnostic Tools</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Button variant="outline" className="h-auto py-4 justify-start">
              <div className="text-left">
                <div className="font-semibold">API Status Checker</div>
                <div className="text-sm text-muted-foreground">
                  Test API endpoint availability and response times
                </div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto py-4 justify-start">
              <div className="text-left">
                <div className="font-semibold">Request Validator</div>
                <div className="text-sm text-muted-foreground">
                  Validate API request format and parameters
                </div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto py-4 justify-start">
              <div className="text-left">
                <div className="font-semibold">Webhook Tester</div>
                <div className="text-sm text-muted-foreground">
                  Test webhook delivery and payload validation
                </div>
              </div>
            </Button>
            <Button variant="outline" className="h-auto py-4 justify-start">
              <div className="text-left">
                <div className="font-semibold">Error Log Analyzer</div>
                <div className="text-sm text-muted-foreground">
                  Analyze and debug API error patterns
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}