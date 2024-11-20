"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { AccountList } from "./mock-data/account-list";
import { TransactionList } from "./mock-data/transaction-list";
import { PaymentTemplates } from "./mock-data/payment-templates";
import { StandingOrders } from "./mock-data/standing-orders";

export function MockData() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Mock Bank Data</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Test data for Open Banking API integration
              </p>
            </div>
            <Button>Reset to Default</Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="accounts" className="space-y-4">
            <TabsList>
              <TabsTrigger value="accounts">Accounts</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="payments">Payment Templates</TabsTrigger>
              <TabsTrigger value="standing-orders">Standing Orders</TabsTrigger>
            </TabsList>

            <TabsContent value="accounts">
              <AccountList />
            </TabsContent>

            <TabsContent value="transactions">
              <TransactionList />
            </TabsContent>

            <TabsContent value="payments">
              <PaymentTemplates />
            </TabsContent>

            <TabsContent value="standing-orders">
              <StandingOrders />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}