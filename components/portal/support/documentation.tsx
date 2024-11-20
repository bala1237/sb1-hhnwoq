"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Code, Zap } from "lucide-react";

const categories = [
  {
    title: "Getting Started",
    icon: BookOpen,
    articles: [
      "Quick Start Guide",
      "Authentication",
      "API Overview",
      "Best Practices",
    ],
  },
  {
    title: "API Reference",
    icon: Code,
    articles: [
      "Endpoints Reference",
      "Error Codes",
      "Rate Limits",
      "Versioning",
    ],
  },
  {
    title: "Integration Guides",
    icon: Zap,
    articles: [
      "SDK Installation",
      "Webhooks Setup",
      "Event Handling",
      "Security Guidelines",
    ],
  },
];

export function Documentation() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Card key={category.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <category.icon className="h-5 w-5" />
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {category.articles.map((article) => (
                  <li key={article}>
                    <Button
                      variant="ghost"
                      className="w-full justify-between"
                    >
                      {article}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Popular Articles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                title: "How to handle API rate limits",
                views: 1234,
                category: "Best Practices",
              },
              {
                title: "Authentication best practices",
                views: 987,
                category: "Security",
              },
              {
                title: "Webhook integration guide",
                views: 756,
                category: "Integration",
              },
            ].map((article) => (
              <div
                key={article.title}
                className="flex items-center justify-between"
              >
                <div className="space-y-1">
                  <Button variant="link" className="p-0 h-auto">
                    {article.title}
                  </Button>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{article.category}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {article.views} views
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}