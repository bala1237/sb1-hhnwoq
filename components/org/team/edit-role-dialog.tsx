"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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

const formSchema = z.object({
  role: z.string(),
});

interface EditRoleDialogProps {
  member: {
    id: string;
    name: string;
    role: string;
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRoleUpdate: (newRole: string) => void;
}

export function EditRoleDialog({
  member,
  open,
  onOpenChange,
  onRoleUpdate,
}: EditRoleDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: member.role.toLowerCase(),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onRoleUpdate(values.role);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Team Member Role</DialogTitle>
          <DialogDescription>
            Change the role and permissions for {member.name}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="developer">Developer</SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Each role has different permissions and access levels
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-4 mt-4">
              <h4 className="text-sm font-medium">Role Permissions</h4>
              <div className="text-sm">
                {form.watch("role") === "admin" && (
                  <ul className="list-disc list-inside space-y-1">
                    <li>Full access to all features</li>
                    <li>Manage team members</li>
                    <li>Manage API keys</li>
                    <li>Access all settings</li>
                  </ul>
                )}
                {form.watch("role") === "developer" && (
                  <ul className="list-disc list-inside space-y-1">
                    <li>Create and manage API keys</li>
                    <li>Access API documentation</li>
                    <li>View analytics</li>
                    <li>Limited settings access</li>
                  </ul>
                )}
                {form.watch("role") === "viewer" && (
                  <ul className="list-disc list-inside space-y-1">
                    <li>View API documentation</li>
                    <li>View analytics</li>
                    <li>No management access</li>
                    <li>No settings access</li>
                  </ul>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button type="submit">Update Role</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}