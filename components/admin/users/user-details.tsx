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
import { Badge } from "@/components/ui/badge";

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

interface UserDetailsProps {
  user: User;
}

export function UserDetails({ user }: UserDetailsProps) {
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

  async function onSubmit(values: any) {
    try {
      const response = await fetch(`/api/admin/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      // Show success message
    } catch (error) {
      // Show error message
      console.error('Error updating user:', error);
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>User Details</CardTitle>
          <Badge variant="outline">{isInternal ? 'Internal User' : 'External User'}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              // Internal user fields
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
                      <FormDescription>
                        Department within the organization
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
                      <FormLabel>Enterprise Role</FormLabel>
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
                        Internal system role and permissions
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : (
              // External user fields
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
                        User's organization
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
                      <FormLabel>Organization Role</FormLabel>
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