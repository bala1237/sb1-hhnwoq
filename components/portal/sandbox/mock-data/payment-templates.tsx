"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { CreatePaymentTemplateDialog } from "./create-payment-template-dialog";

const mockTemplates = [
  {
    id: "tmpl_1",
    name: "Utility Bill Payment",
    type: "domestic_payment",
    currency: "GBP",
    amount: 75.00,
    beneficiary: {
      name: "British Gas",
      accountNumber: "12345678",
      sortCode: "12-34-56"
    }
  },
  {
    id: "tmpl_2",
    name: "International Transfer",
    type: "international_payment",
    currency: "EUR",
    amount: 1000.00,
    beneficiary: {
      name: "Jean Dupont",
      iban: "FR1420041010050500013M02606",
      bic: "SOGEFRPP"
    }
  }
];

export function PaymentTemplates() {
  const [templates, setTemplates] = useState(mockTemplates);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h3 className="text-lg font-medium">Payment Templates</h3>
          <p className="text-sm text-muted-foreground">
            Pre-configured payment templates for testing
          </p>
        </div>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Template
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {templates.map((template) => (
          <Card key={template.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-medium">{template.name}</h4>
                  <Badge variant="outline" className="mt-1">
                    {template.type}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="font-medium">
                    {template.currency} {template.amount.toFixed(2)}
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Beneficiary:</span>
                  <span>{template.beneficiary.name}</span>
                </div>
                {'accountNumber' in template.beneficiary ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Account:</span>
                      <span>{template.beneficiary.accountNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sort Code:</span>
                      <span>{template.beneficiary.sortCode}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">IBAN:</span>
                      <span>{template.beneficiary.iban}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">BIC:</span>
                      <span>{template.beneficiary.bic}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="flex justify-end mt-4 gap-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="ghost" size="sm">Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <CreatePaymentTemplateDialog 
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSuccess={(newTemplate) => {
          setTemplates([...templates, newTemplate]);
          setCreateDialogOpen(false);
        }}
      />
    </div>
  );
}