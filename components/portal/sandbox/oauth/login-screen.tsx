"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { TEST_USERS, type TestUser } from "@/lib/config/test-users";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const formSchema = z.object({
  userId: z.string(),
  username: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

interface LoginScreenProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (user: TestUser) => void;
}

export function LoginScreen({
  open,
  onOpenChange,
  onSuccess,
}: LoginScreenProps) {
  const [selectedUser, setSelectedUser] = useState<TestUser | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: "",
      username: "",
      password: "",
    },
  });

  const handleUserSelect = (userId: string) => {
    const user = TEST_USERS.find(u => u.id === userId);
    if (user) {
      setSelectedUser(user);
      form.setValue("userId", user.id);
      form.setValue("username", user.username);
      form.setValue("password", user.password);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const user = TEST_USERS.find(u => u.id === values.userId);
    if (user && values.username === user.username && values.password === user.password) {
      onSuccess(user);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sandbox Login</DialogTitle>
          <DialogDescription>
            Select a test user to proceed with OAuth flow
          </DialogDescription>
        </DialogHeader>

        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertDescription>
            These are sandbox test users. No real credentials required.
          </AlertDescription>
        </Alert>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Test User</FormLabel>
                  <Select
                    onValueChange={(value) => handleUserSelect(value)}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a test user" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TEST_USERS.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                          {user.displayName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {selectedUser && (
              <>
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input {...field} type="password" readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <Button 
              type="submit" 
              className="w-full"
              disabled={!selectedUser}
            >
              Login
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}