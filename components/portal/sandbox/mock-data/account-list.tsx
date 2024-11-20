"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const mockAccounts = [
  {
    id: "acc_checking",
    type: "Checking",
    currency: "GBP",
    balance: 2500.50,
    status: "active",
    sortCode: "12-34-56",
    accountNumber: "12345678",
    details: {
      overdraftLimit: 500,
      interestRate: "0.1%"
    }
  },
  {
    id: "acc_savings",
    type: "Savings",
    currency: "GBP",
    balance: 15000.00,
    status: "active",
    sortCode: "12-34-56",
    accountNumber: "87654321",
    details: {
      interestRate: "2.5%",
      lastInterestPaid: "2024-02-01"
    }
  },
  {
    id: "acc_credit",
    type: "Credit Card",
    currency: "GBP",
    balance: -1250.75,
    status: "active",
    cardNumber: "**** **** **** 1234",
    details: {
      creditLimit: 5000,
      apr: "19.9%",
      dueDate: "2024-03-15"
    }
  },
  {
    id: "acc_investment",
    type: "Investment",
    currency: "GBP",
    balance: 50000.00,
    status: "active",
    accountNumber: "INV123456",
    details: {
      portfolioType: "Balanced",
      ytdReturn: "8.5%",
      lastValuation: "2024-02-20"
    }
  }
];

export function AccountList() {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h3 className="text-lg font-medium">Test Accounts</h3>
        <p className="text-sm text-muted-foreground">
          Available mock bank accounts for testing
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Account Type</TableHead>
            <TableHead>Account Details</TableHead>
            <TableHead>Balance</TableHead>
            <TableHead>Additional Info</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockAccounts.map((account) => (
            <TableRow key={account.id}>
              <TableCell>
                <Badge variant="outline">{account.type}</Badge>
              </TableCell>
              <TableCell>
                {account.cardNumber ? (
                  <div className="space-y-1">
                    <div className="text-sm">Card Number: {account.cardNumber}</div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {account.sortCode && (
                      <div className="text-sm">Sort Code: {account.sortCode}</div>
                    )}
                    <div className="text-sm">Account: {account.accountNumber}</div>
                  </div>
                )}
              </TableCell>
              <TableCell>
                <span className={account.balance < 0 ? "text-destructive" : ""}>
                  {account.currency} {Math.abs(account.balance).toFixed(2)}
                </span>
              </TableCell>
              <TableCell>
                <div className="space-y-1 text-sm">
                  {Object.entries(account.details).map(([key, value]) => (
                    <div key={key} className="text-muted-foreground">
                      {key.replace(/([A-Z])/g, ' $1').trim()}: {value}
                    </div>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}