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
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  roles: z.array(z.string()),
  plans: z.array(z.string()),
  dependencies: z.array(z.string()).optional(),
});

interface FeatureConfigDialogProps {
  feature: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (config: any) => void;
}

const availableRoles = [
  { id: 'admin', label: 'Admin' },
  { id: 'developer', label: 'Developer' },
  { id: 'viewer', label: 'Viewer' },
  { id: 'enterprise_admin', label: 'Enterprise Admin' },
  { id: 'support_manager', label: 'Support Manager' },
  { id: 'security_auditor', label: 'Security Auditor' }
];

const availablePlans = [
  { id: 'free', label: 'Free' },
  { id: 'pro', label: 'Pro' },
  { id: 'enterprise', label: 'Enterprise' }
];

export function FeatureConfigDialog({
  feature,
  open,
  onOpenChange,
  onSave,
}: FeatureConfigDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      roles: feature?.access?.roles || [],
      plans: feature?.access?.plans || [],
      dependencies: feature?.dependencies || [],
    },
  });

  if (!feature) return null;

  const title = feature.type === 'module' 
    ? `Configure ${feature.id} Module`
    : `Configure ${feature.moduleId} - ${feature.id}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Configure access roles and required plans
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSave)} className="space-y-6">
            <FormField
              control={form.control}
              name="roles"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Allowed Roles</FormLabel>
                  <FormDescription>
                    Select which roles can access this feature
                  </FormDescription>
                  <div className="grid grid-cols-2 gap-4">
                    {availableRoles.map((role) => (
                      <FormField
                        key={role.id}
                        control={form.control}
                        name="roles"
                        render={({ field }) => (
                          <FormItem
                            key={role.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(role.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, role.id])
                                    : field.onChange(
                                        field.value?.filter((value) => value !== role.id)
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {role.label}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="plans"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Required Plans</FormLabel>
                  <FormDescription>
                    Select which plans have access to this feature
                  </FormDescription>
                  <div className="grid grid-cols-2 gap-4">
                    {availablePlans.map((plan) => (
                      <FormField
                        key={plan.id}
                        control={form.control}
                        name="plans"
                        render={({ field }) => (
                          <FormItem
                            key={plan.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(plan.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, plan.id])
                                    : field.onChange(
                                        field.value?.filter((value) => value !== plan.id)
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {plan.label}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}