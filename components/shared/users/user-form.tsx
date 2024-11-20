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
import { Card, CardContent } from "@/components/ui/card";
import { User } from "@/lib/types/users";

const baseSchema = {
  fullName: z.string().min(2).max(50),
  email: z.string().email(),
};

const internalUserSchema = z.object({
  ...baseSchema,
  type: z.literal('internal'),
  department: z.string(),
  role: z.enum([
    "enterprise_admin",
    "enterprise_support",
    "enterprise_security",
    "enterprise_custom"
  ]),
});

const externalUserSchema = z.object({
  ...baseSchema,
  type: z.literal('external'),
  organizationId: z.string(),
  role: z.enum([
    "org_admin",
    "org_developer",
    "org_viewer"
  ]),
});

interface UserFormProps {
  user?: User;
  type: 'internal' | 'external';
  context: 'admin' | 'enterprise';
  onSubmit: (data: any) => Promise<void>;
  organizations?: Array<{ id: string; name: string; }>;
}

export function UserForm({ user, type, context, onSubmit, organizations }: UserFormProps) {
  const form = useForm({
    resolver: zodResolver(type === 'internal' ? internalUserSchema : externalUserSchema),
    defaultValues: user ? {
      ...user,
      type
    } : {
      type,
      fullName: '',
      email: '',
      ...(type === 'internal' 
        ? { department: '', role: 'enterprise_custom' as const }
        : { organizationId: '', role: 'org_viewer' as const }
      )
    },
  });

  const getInternalRoles = () => {
    if (context === 'enterprise') {
      return [
        { value: 'enterprise_admin', label: 'Enterprise Admin' },
        { value: 'enterprise_support', label: 'Support Manager' },
        { value: 'enterprise_security', label: 'Security Auditor' },
        { value: 'enterprise_custom', label: 'Custom Role' },
      ];
    }
    return [
      { value: 'enterprise_admin', label: 'Enterprise Admin' },
      { value: 'enterprise_support', label: 'Support Manager' },
      { value: 'enterprise_security', label: 'Security Auditor' },
      { value: 'enterprise_custom', label: 'Custom Role' },
    ];
  };

  return (
    <Card>
      <CardContent className="pt-6">
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
                  <FormDescription>
                    User will receive an invitation at this email
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {type === 'internal' ? (
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
                          {getInternalRoles().map(role => (
                            <SelectItem key={role.value} value={role.value}>
                              {role.label}
                            </SelectItem>
                          ))}
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
                  name="organizationId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select organization" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {organizations?.map(org => (
                            <SelectItem key={org.id} value={org.id}>
                              {org.name}
                            </SelectItem>
                          ))}
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

            <div className="flex justify-end gap-2">
              <Button type="submit">
                {user ? 'Update' : 'Create'} User
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}