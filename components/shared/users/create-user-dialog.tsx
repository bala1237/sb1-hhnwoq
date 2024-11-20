"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserForm } from "./user-form";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface CreateUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userType: 'internal' | 'external';
  context: 'admin' | 'enterprise';
  organizations?: Array<{ id: string; name: string; }>;
}

export function CreateUserDialog({ 
  open, 
  onOpenChange,
  userType,
  context,
  organizations 
}: CreateUserDialogProps) {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: any) => {
    try {
      setError(null);
      const endpoint = context === 'admin' 
        ? '/api/admin/users' 
        : '/api/enterprise/users';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      onOpenChange(false);
    } catch (err) {
      console.error('Error creating user:', err);
      setError('Failed to create user. Please try again.');
    }
  };

  const getTitle = () => {
    if (context === 'admin') {
      return `Create ${userType === 'internal' ? 'Internal' : 'External'} User`;
    }
    return 'Create Enterprise User';
  };

  const getDescription = () => {
    if (context === 'admin') {
      return `Add a new ${userType === 'internal' ? 'internal enterprise' : 'external organization'} user`;
    }
    return 'Add a new enterprise user with internal access';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
          <DialogDescription>{getDescription()}</DialogDescription>
        </DialogHeader>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <UserForm 
          type={userType}
          onSubmit={handleSubmit}
          organizations={organizations}
          context={context}
        />
      </DialogContent>
    </Dialog>
  );
}