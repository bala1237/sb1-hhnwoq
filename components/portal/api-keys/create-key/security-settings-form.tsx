"use client";

import { useState } from "react";
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
import { Switch } from "@/components/ui/switch";
import { Plus, X } from "lucide-react";
import type { ApiKeyFormData } from "../create-api-key-dialog";

const formSchema = z.object({
  ipWhitelist: z.array(z.string()),
  rateLimit: z.number().min(1),
  autoRotate: z.boolean(),
  rotationPeriod: z.number().optional(),
  usageAlerts: z.boolean(),
  usageThreshold: z.number().optional(),
});

interface SecuritySettingsFormProps {
  data: ApiKeyFormData;
  onUpdate: (data: Partial<ApiKeyFormData>) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export function SecuritySettingsForm({
  data,
  onUpdate,
  onSubmit,
  onBack,
}: SecuritySettingsFormProps) {
  const [newIp, setNewIp] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ipWhitelist: data.ipWhitelist || [],
      rateLimit: data.rateLimit || 1000,
      autoRotate: data.autoRotate || false,
      rotationPeriod: data.rotationPeriod,
      usageAlerts: data.usageAlerts || false,
      usageThreshold: data.usageThreshold,
    },
  });

  const addIp = () => {
    if (newIp && form.getValues().ipWhitelist.indexOf(newIp) === -1) {
      const updatedIps = [...form.getValues().ipWhitelist, newIp];
      form.setValue("ipWhitelist", updatedIps);
      setNewIp("");
    }
  };

  const removeIp = (ip: string) => {
    const updatedIps = form.getValues().ipWhitelist.filter((i) => i !== ip);
    form.setValue("ipWhitelist", updatedIps);
  };

  function onFormSubmit(values: z.infer<typeof formSchema>) {
    onUpdate(values);
    onSubmit();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6 pt-4">
        <FormField
          control={form.control}
          name="ipWhitelist"
          render={() => (
            <FormItem>
              <FormLabel>IP Whitelist</FormLabel>
              <FormDescription>
                Add IP addresses that are allowed to use this API key
              </FormDescription>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter IP address"
                    value={newIp}
                    onChange={(e) => setNewIp(e.target.value)}
                  />
                  <Button type="button" onClick={addIp}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {form.watch("ipWhitelist").map((ip) => (
                    <div
                      key={ip}
                      className="flex items-center justify-between rounded-md border p-2"
                    >
                      <code className="text-sm">{ip}</code>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeIp(ip)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rateLimit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rate Limit (requests per hour)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                Maximum number of API requests allowed per hour
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="autoRotate"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Automatic Key Rotation</FormLabel>
                <FormDescription>
                  Automatically rotate this API key periodically
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {form.watch("autoRotate") && (
          <FormField
            control={form.control}
            name="rotationPeriod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rotation Period (days)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Number of days before the key is automatically rotated
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="usageAlerts"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Usage Alerts</FormLabel>
                <FormDescription>
                  Receive alerts when usage reaches a threshold
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {form.watch("usageAlerts") && (
          <FormField
            control={form.control}
            name="usageThreshold"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usage Threshold (%)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  Percentage of rate limit that triggers an alert
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Previous Step
          </Button>
          <Button type="submit">Create API Key</Button>
        </div>
      </form>
    </Form>
  );
}