"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/lib/types/users";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

// Separate schemas for internal and external users
const internalUserSchema = z.object({
  fullName: z.string().min(2).max(50),
  email: z.string().email(),
  department: z.string(),
  role: z.enum([
    "enterprise_admin",
    "enterprise_support",
    "enterprise_security",
    "enterprise_custom"
  ]),
});

const externalUserSchema = z.object({
  fullName: z.string().min(2).max(50),
  email: z.string().email(),
  organizationName: z.string(),
  role: z.enum([
    "org_admin",
    "org_developer",
    "org_viewer"
  ]),
});

interface UserProfileFormProps {
  user: User;
  context: 'admin' | 'enterprise';
  onSubmit?: (user: User) => void;
}

export function UserProfileForm({ user, context, onSubmit }: UserProfileFormProps) {
  const [error, setError] = useState<string | null>(null);
  const isInternal = user.type === 'internal';
  
  const form = useForm({
    resolver: zodResolver(isInternal ? internalUserSchema : externalUserSchema),
    defaultValues: isInternal ? {
      fullName: user.fullName,
      email: user.email,
      department: user.department || '',
      role: user.role,
    } : {
      fullName: user.fullName,
      email: user.email,
      organizationName: user.organizationName,
      role: user.role,
    },
  });

  const handleSubmit = async (values: any) => {
    try {
      setError(null);
      await onSubmit?.({
        ...user,
        ...values,
      });
    } catch (err) {
      setError('Failed to update user profile');
      console.error('Error updating user:', err);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isInternal ? (
              <>
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="IT">IT</SelectItem>
                          <SelectItem value="Security">Security</SelectItem>
                          <SelectItem value="Support">Support</SelectItem>
                          <SelectItem value="Engineering">Engineering</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="enterprise_admin">Enterprise Admin</SelectItem>
                          <SelectItem value="enterprise_support">Support Manager</SelectItem>
                          <SelectItem value="enterprise_security">Security Auditor</SelectItem>
                          <SelectItem value="enterprise_custom">Custom Role</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        User's role determines their permissions
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : (
              <>
                <FormField
                  control={form.control}
                  name="organizationName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization</FormLabel>
                      <FormControl>
                        <Input {...field} readOnly />
                      </FormControl>
                      <FormDescription>
                        Organization cannot be changed here
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="org_admin">Organization Admin</SelectItem>
                          <SelectItem value="org_developer">Developer</SelectItem>
                          <SelectItem value="org_viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        User's role within their organization
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <div className="flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}