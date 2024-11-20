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
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const securitySettingsSchema = z.object({
  mfaRequired: z.boolean(),
  ipWhitelist: z.string(),
  apiRateLimit: z.string(),
  autoKeyRotation: z.boolean(),
  keyRotationDays: z.string(),
  logRetentionDays: z.string(),
});

export function SecuritySettings() {
  const form = useForm<z.infer<typeof securitySettingsSchema>>({
    resolver: zodResolver(securitySettingsSchema),
    defaultValues: {
      mfaRequired: true,
      ipWhitelist: "",
      apiRateLimit: "1000",
      autoKeyRotation: false,
      keyRotationDays: "90",
      logRetentionDays: "30",
    },
  });

  function onSubmit(values: z.infer<typeof securitySettingsSchema>) {
    console.log(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="mfaRequired"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Require Two-Factor Authentication
                    </FormLabel>
                    <FormDescription>
                      Enforce 2FA for all team members
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

            <FormField
              control={form.control}
              name="ipWhitelist"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IP Whitelist</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter IP addresses" />
                  </FormControl>
                  <FormDescription>
                    Comma-separated list of allowed IP addresses
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="apiRateLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Rate Limit (requests per hour)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormDescription>
                    Maximum number of API requests per hour
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="autoKeyRotation"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Automatic API Key Rotation
                    </FormLabel>
                    <FormDescription>
                      Automatically rotate API keys periodically
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

            <FormField
              control={form.control}
              name="keyRotationDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Rotation Period (days)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormDescription>
                    Number of days before API keys are automatically rotated
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="logRetentionDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Log Retention Period (days)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormDescription>
                    Number of days to retain API usage logs
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Save Changes</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}