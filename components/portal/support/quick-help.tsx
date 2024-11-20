"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { CreateTicketDialog } from "./create-ticket-dialog";
import { useToast } from "@/components/ui/use-toast";

const helpTopics = [
  {
    id: "authentication",
    category: "Authentication",
    questions: [
      {
        q: "How do I authenticate API requests?",
        a: "Use your API key in the Authorization header: 'Authorization: Bearer YOUR_API_KEY'. Find your API keys in the API Keys section.",
      },
      {
        q: "Why am I getting authentication errors?",
        a: "Common causes include: expired API keys, incorrect key format, or using test keys in production. Verify your API key and environment.",
      },
    ],
  },
  {
    id: "rate-limits",
    category: "Rate Limits",
    questions: [
      {
        q: "What are the API rate limits?",
        a: "Rate limits vary by plan. Check your current limits in the Usage section. Implement exponential backoff when you hit limits.",
      },
      {
        q: "How do I handle rate limit errors?",
        a: "Monitor the X-RateLimit headers in responses. Implement retry logic with exponential backoff when you receive 429 errors.",
      },
    ],
  },
  {
    id: "webhooks",
    category: "Webhooks",
    questions: [
      {
        q: "How do I set up webhooks?",
        a: "Configure webhook endpoints in the Settings section. Ensure your endpoint is publicly accessible and can handle POST requests.",
      },
      {
        q: "How do I verify webhook signatures?",
        a: "Use your webhook secret to validate the X-Signature header. This prevents unauthorized webhook calls.",
      },
    ],
  },
];

interface QuickHelpProps {
  onCreateTicket: (data: any) => Promise<void>;
}

export function QuickHelp({ onCreateTicket }: QuickHelpProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { toast } = useToast();

  // Filter topics and questions based on search
  const filteredTopics = helpTopics.map(topic => ({
    ...topic,
    questions: topic.questions.filter(
      q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
           q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(topic => topic.questions.length > 0);

  const handleCreateTicket = async (data: any) => {
    try {
      await onCreateTicket(data);
      setCreateDialogOpen(false);
      toast({
        title: "Ticket created",
        description: "Your support ticket has been created successfully."
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create support ticket. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="flex items-center space-x-2">
        <Search className="w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search for help..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedTopic === null ? "default" : "outline"}
          onClick={() => setSelectedTopic(null)}
        >
          All Topics
        </Button>
        {helpTopics.map((topic) => (
          <Button
            key={topic.id}
            variant={selectedTopic === topic.id ? "default" : "outline"}
            onClick={() => setSelectedTopic(topic.id)}
          >
            {topic.category}
          </Button>
        ))}
      </div>

      {/* FAQ Accordion */}
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {filteredTopics
              .filter(topic => !selectedTopic || topic.id === selectedTopic)
              .map((topic) => (
                <div key={topic.id} className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium">{topic.category}</h3>
                    <Badge variant="outline">
                      {topic.questions.length} {topic.questions.length === 1 ? 'item' : 'items'}
                    </Badge>
                  </div>
                  {topic.questions.map((qa, index) => (
                    <AccordionItem key={index} value={`${topic.id}-${index}`}>
                      <AccordionTrigger className="text-left">
                        {qa.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {qa.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </div>
              ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card>
        <CardContent className="pt-6">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">
              Can't find what you're looking for?
            </p>
            <Button onClick={() => setCreateDialogOpen(true)}>
              Create Support Ticket
            </Button>
          </div>
        </CardContent>
      </Card>

      <CreateTicketDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreateTicket}
      />
    </div>
  );
}