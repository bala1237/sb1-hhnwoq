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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";

const brandingSchema = z.object({
  companyName: z.string().min(2).max(50),
  logo: z.string().optional(),
  favicon: z.string().optional(),
  customDomain: z.string().url().optional(),
  footerText: z.string().max(200),
});

interface BrandingSettingsProps {
  settings: any;
  onUpdate?: (settings: any) => void;
}

export function BrandingSettings({ settings, onUpdate }: BrandingSettingsProps) {
  const form = useForm<z.infer<typeof brandingSchema>>({
    resolver: zodResolver(brandingSchema),
    defaultValues: {
      companyName: settings?.companyName || "",
      logo: settings?.logo || "",
      favicon: settings?.favicon || "",
      customDomain: settings?.customDomain || "",
      footerText: settings?.footerText || "",
    },
  });

  function onSubmit(values: z.infer<typeof brandingSchema>) {
    onUpdate?.(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Branding Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Your company name as it will appear in the portal
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-4">
                      {field.value && (
                        <img
                          src={field.value}
                          alt="Company Logo"
                          className="h-12 w-12 object-contain"
                        />
                      )}
                      <Button type="button" variant="outline">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Logo
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Recommended size: 200x50px, PNG or SVG
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="favicon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Favicon</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-4">
                      {field.value && (
                        <img
                          src={field.value}
                          alt="Favicon"
                          className="h-8 w-8 object-contain"
                        />
                      )}
                      <Button type="button" variant="outline">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Favicon
                      </Button>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Recommended size: 32x32px, PNG or ICO
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customDomain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom Domain</FormLabel>
                  <FormControl>
                    <Input {...field} type="url" placeholder="https://developers.yourcompany.com" />
                  </FormControl>
                  <FormDescription>
                    Your custom domain for the developer portal
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="footerText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Footer Text</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="© 2024 Your Company. All rights reserved." />
                  </FormControl>
                  <FormDescription>
                    Text to display in the portal footer
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