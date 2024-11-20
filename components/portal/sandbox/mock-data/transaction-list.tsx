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
import { CreateTransactionDialog } from "./create-transaction-dialog";

const mockTransactions = [
  {
    id: "txn_1",
    date: "2024-02-20",
    description: "Sainsbury's Local",
    type: "debit",
    amount: 25.50,
    currency: "GBP",
    category: "groceries",
    status: "completed"
  },
  {
    id: "txn_2",
    date: "2024-02-19",
    description: "TFL Travel",
    type: "debit",
    amount: 6.80,
    currency: "GBP",
    category: "transport",
    status: "completed"
  },
  {
    id: "txn_3",
    date: "2024-02-19",
    description: "Salary Payment",
    type: "credit",
    amount: 2500.00,
    currency: "GBP",
    category: "income",
    status: "completed"
  }
];

export function TransactionList() {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="text-lg font-medium">Test Transactions</h3>
          <p className="text-sm text-muted-foreground">
            Manage mock transactions for testing
          </p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{transaction.date}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>
                <Badge variant="outline">{transaction.category}</Badge>
              </TableCell>
              <TableCell>
                <span className={transaction.type === "debit" ? "text-destructive" : "text-green-600"}>
                  {transaction.type === "debit" ? "-" : "+"}
                  {transaction.currency} {transaction.amount.toFixed(2)}
                </span>
              </TableCell>
              <TableCell>
                <Badge>{transaction.status}</Badge>
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

      <CreateTransactionDialog 
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSuccess={(newTransaction) => {
          setTransactions([newTransaction, ...transactions]);
          setCreateDialogOpen(false);
        }}
      />
    </div>
  );
}