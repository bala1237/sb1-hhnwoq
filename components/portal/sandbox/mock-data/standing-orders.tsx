"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreateStandingOrderDialog } from "./create-standing-order-dialog";

const mockStandingOrders = [
  {
    id: "so_1",
    reference: "Rent Payment",
    frequency: "monthly",
    nextDate: "2024-03-01",
    amount: 1200.00,
    currency: "GBP",
    status: "active",
    beneficiary: {
      name: "London Property Ltd",
      accountNumber: "12345678",
      sortCode: "12-34-56"
    }
  },
  {
    id: "so_2",
    reference: "Gym Membership",
    frequency: "monthly",
    nextDate: "2024-03-05",
    amount: 49.99,
    currency: "GBP",
    status: "active",
    beneficiary: {
      name: "PureGym Ltd",
      accountNumber: "87654321",
      sortCode: "65-43-21"
    }
  }
];

export function StandingOrders() {
  const [standingOrders, setStandingOrders] = useState(mockStandingOrders);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="text-lg font-medium">Standing Orders</h3>
          <p className="text-sm text-muted-foreground">
            Manage recurring payment instructions
          </p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Standing Order
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Reference</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead>Next Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {standingOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.reference}</TableCell>
              <TableCell className="capitalize">{order.frequency}</TableCell>
              <TableCell>{order.nextDate}</TableCell>
              <TableCell>
                {order.currency} {order.amount.toFixed(2)}
              </TableCell>
              <TableCell>
                <Badge>{order.status}</Badge>
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <CreateStandingOrderDialog 
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSuccess={(newOrder) => {
          setStandingOrders([...standingOrders, newOrder]);
          setCreateDialogOpen(false);
        }}
      />
    </div>
  );
}