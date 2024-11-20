"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  avatar?: string;
}

interface ViewTicketDialogProps {
  ticket: {
    id: string;
    subject: string;
    status: string;
    priority: string;
    created: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const messages: Message[] = [
  {
    id: "1",
    content: "I'm having issues with API authentication. Getting 401 errors.",
    sender: "John Doe",
    timestamp: "2024-02-20 14:30:00",
    avatar: "/avatars/01.png",
  },
  {
    id: "2",
    content: "Could you please provide your API key and the exact error message you're receiving?",
    sender: "Support Agent",
    timestamp: "2024-02-20 14:35:00",
    avatar: "/avatars/support.png",
  },
];

export function ViewTicketDialog({
  ticket,
  open,
  onOpenChange,
}: ViewTicketDialogProps) {
  const [reply, setReply] = useState("");

  const handleSendReply = () => {
    if (reply.trim()) {
      console.log("Sending reply:", reply);
      setReply("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Ticket #{ticket.id}</DialogTitle>
            <Badge
              variant={
                ticket.status === "open"
                  ? "destructive"
                  : ticket.status === "in_progress"
                  ? "default"
                  : "secondary"
              }
            >
              {ticket.status}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Created: {ticket.created}</span>
            <Badge variant="outline">{ticket.priority} priority</Badge>
          </div>
        </DialogHeader>

        <Card className="p-4">
          <h4 className="font-medium mb-2">{ticket.subject}</h4>
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="flex items-start gap-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={message.avatar} alt={message.sender} />
                  <AvatarFallback>
                    {message.sender[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{message.sender}</span>
                    <span className="text-xs text-muted-foreground">
                      {message.timestamp}
                    </span>
                  </div>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-4">
          <Textarea
            placeholder="Type your reply..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button onClick={handleSendReply} disabled={!reply.trim()}>
              Send Reply
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}