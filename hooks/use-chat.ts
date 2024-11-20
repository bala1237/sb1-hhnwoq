"use client";

import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useToast } from "@/components/ui/use-toast";

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

interface Agent {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline";
}

export function useChat() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [agent, setAgent] = useState<Agent | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const newSocket = io("/chat", {
      path: "/api/socketio",
      auth: {
        token: localStorage.getItem("auth_token"),
      },
    });

    newSocket.on("connect", () => {
      setIsConnected(true);
      toast({
        title: "Connected to support",
        description: "You can now chat with our support team",
      });
    });

    newSocket.on("disconnect", () => {
      setIsConnected(false);
      toast({
        title: "Disconnected",
        description: "Lost connection to support chat",
        variant: "destructive",
      });
    });

    newSocket.on("agent:assigned", (assignedAgent: Agent) => {
      setAgent(assignedAgent);
      toast({
        title: "Agent assigned",
        description: `${assignedAgent.name} has joined the chat`,
      });
    });

    newSocket.on("message:received", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    newSocket.on("agent:typing", () => {
      // Handle agent typing indicator
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  const sendMessage = (message: {
    content: string;
    type: "text" | "code" | "file";
    metadata?: any;
  }) => {
    if (!socket) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message.content,
      sender: "user",
      timestamp: new Date().toISOString(),
      type: message.type,
      metadata: message.metadata,
    };

    setMessages((prev) => [...prev, newMessage]);
    socket.emit("message:send", newMessage);
  };

  const markAsRead = () => {
    if (!socket) return;
    socket.emit("messages:read");
  };

  return {
    messages,
    sendMessage,
    agent,
    isConnected,
    markAsRead,
  };
}