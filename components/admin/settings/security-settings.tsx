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
  sessionTimeout: z.string(),
  passwordPolicy: z.string(),
  ipWhitelist: z.string(),
  corsOrigins: z.string(),
});

export function SecuritySettings() {
  const form = useForm<z.infer<typeof securitySettingsSchema>>({
    resolver: zodResolver(securitySettingsSchema),
    defaultValues: {
      mfaRequired: true,
      sessionTimeout: "30",
      passwordPolicy: "strong",
      ipWhitelist: "",
      corsOrigins: "*",
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
                      Enforce 2FA for all users
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
              name="sessionTimeout"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Session Timeout (minutes)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormDescription>
                    Automatically log out users after inactivity
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="passwordPolicy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Policy</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select password policy" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="basic">Basic</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="strong">Strong</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Set password complexity requirements
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

            <FormField
              control={form.control}
              name="corsOrigins"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CORS Origins</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter allowed origins" />
                  </FormControl>
                  <FormDescription>
                    Comma-separated list of allowed origins (* for all)
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