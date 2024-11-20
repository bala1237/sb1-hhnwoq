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

const apiSettingsSchema = z.object({
  defaultVersion: z.string(),
  webhookUrl: z.string().url().optional(),
  webhookSecret: z.string().min(16).optional(),
  retryEnabled: z.boolean(),
  maxRetries: z.string(),
  ipWhitelist: z.string(),
});

export function ApiSettings() {
  const form = useForm<z.infer<typeof apiSettingsSchema>>({
    resolver: zodResolver(apiSettingsSchema),
    defaultValues: {
      defaultVersion: "v1",
      webhookUrl: "",
      webhookSecret: "",
      retryEnabled: true,
      maxRetries: "3",
      ipWhitelist: "",
    },
  });

  function onSubmit(values: z.infer<typeof apiSettingsSchema>) {
    console.log(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="defaultVersion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default API Version</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select API version" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="v1">Version 1.0</SelectItem>
                      <SelectItem value="v2">Version 2.0</SelectItem>
                      <SelectItem value="v3">Version 3.0 (Beta)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Default version for API requests
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="webhookUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Webhook URL</FormLabel>
                  <FormControl>
                    <Input {...field} type="url" placeholder="https://" />
                  </FormControl>
                  <FormDescription>
                    URL for receiving webhook notifications
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="webhookSecret"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Webhook Secret</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormDescription>
                    Secret key for webhook signature verification
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="retryEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Enable Retries</FormLabel>
                    <FormDescription>
                      Automatically retry failed webhook deliveries
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
              name="maxRetries"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Retries</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min="0" max="10" />
                  </FormControl>
                  <FormDescription>
                    Maximum number of retry attempts (0-10)
                  </FormDescription>
                  <FormMessage />
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

            <div className="flex justify-end">
              <Button type="submit">Save Configuration</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}