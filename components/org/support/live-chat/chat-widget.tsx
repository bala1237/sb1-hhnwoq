"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MessageSquare, X, Paperclip, Code, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useChat } from "@/hooks/use-chat";
import { CodeSnippet } from "./code-snippet";
import { FileUpload } from "./file-upload";

interface Message {
  id: string;
  content: string;
  sender: "user" | "agent";
  timestamp: string;
  type: "text" | "code" | "file";
  metadata?: {
    fileName?: string;
    fileUrl?: string;
    language?: string;
  };
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { 
    messages,
    sendMessage,
    agent,
    isConnected,
    markAsRead 
  } = useChat();

  useEffect(() => {
    if (isOpen) {
      markAsRead();
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (!message.trim()) return;
    sendMessage({
      content: message,
      type: "text"
    });
    setMessage("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full h-14 w-14 shadow-lg"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      ) : (
        <Card className="w-[380px] h-[600px] flex flex-col">
          {/* Header */}
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                {agent ? (
                  <AvatarImage src={agent.avatar} alt={agent.name} />
                ) : (
                  <AvatarFallback>S</AvatarFallback>
                )}
              </Avatar>
              <div>
                <h3 className="font-medium text-sm">
                  {agent ? agent.name : "Support"}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {isConnected ? (
                    <Badge variant="default" className="text-xs">
                      Online
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="text-xs">
                      Connecting...
                    </Badge>
                  )}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex",
                  msg.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3",
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  {msg.type === "text" && <p className="text-sm">{msg.content}</p>}
                  {msg.type === "code" && (
                    <CodeSnippet
                      code={msg.content}
                      language={msg.metadata?.language || "javascript"}
                    />
                  )}
                  {msg.type === "file" && (
                    <a
                      href={msg.metadata?.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm underline"
                    >
                      {msg.metadata?.fileName}
                    </a>
                  )}
                  <span className="text-xs text-muted-foreground block mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <FileUpload />
              <Button variant="ghost" size="icon">
                <Code className="h-4 w-4" />
              </Button>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Type a message..."
                className="flex-1 min-h-[40px] max-h-[120px]"
              />
              <Button onClick={handleSend} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}