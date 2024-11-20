"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CreateTicketDialog } from "./create-ticket-dialog";
import { ViewTicketDialog } from "./view-ticket-dialog";

const tickets = [
  {
    id: "TICK-1234",
    subject: "API Authentication Issue",
    status: "open",
    priority: "high",
    created: "2024-02-20",
    lastUpdate: "2 hours ago",
  },
  {
    id: "TICK-1235",
    subject: "Rate Limiting Questions",
    status: "in_progress",
    priority: "medium",
    created: "2024-02-19",
    lastUpdate: "1 day ago",
  },
];

export function SupportTickets() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleViewTicket = (ticket) => {
    setSelectedTicket(ticket);
    setViewDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search tickets..."
            className="h-8 w-[150px] lg:w-[250px]"
          />
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          Create Ticket
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticket ID</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Last Update</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="font-medium">{ticket.id}</TableCell>
                <TableCell>
                  <button
                    onClick={() => handleViewTicket(ticket)}
                    className="hover:underline text-left"
                  >
                    {ticket.subject}
                  </button>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      ticket.status === "open"
                        ? "destructive"
                        : ticket.status === "in_progress"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {ticket.status.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{ticket.priority}</Badge>
                </TableCell>
                <TableCell>{ticket.lastUpdate}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    onClick={() => handleViewTicket(ticket)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CreateTicketDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />

      {selectedTicket && (
        <ViewTicketDialog
          ticket={selectedTicket}
          open={viewDialogOpen}
          onOpenChange={setViewDialogOpen}
        />
      )}
    </div>
  );
}