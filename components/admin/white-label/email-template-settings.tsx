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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmailTemplatePreview } from "./email-template-preview";

const templateSchema = z.object({
  welcomeSubject: z.string().min(1),
  welcomeContent: z.string().min(1),
  passwordResetSubject: z.string().min(1),
  passwordResetContent: z.string().min(1),
  apiKeySubject: z.string().min(1),
  apiKeyContent: z.string().min(1),
});

interface EmailTemplateSettingsProps {
  settings: any;
  onUpdate?: (settings: any) => void;
}

export function EmailTemplateSettings({ settings, onUpdate }: EmailTemplateSettingsProps) {
  const form = useForm<z.infer<typeof templateSchema>>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      welcomeSubject: settings?.welcome?.subject || "Welcome to {{company}}",
      welcomeContent: settings?.welcome?.content || "Welcome {{name}},\n\nThank you for joining {{company}}. Get started by...",
      passwordResetSubject: settings?.passwordReset?.subject || "Reset Your Password",
      passwordResetContent: settings?.passwordReset?.content || "Hi {{name}},\n\nClick the link below to reset your password:\n{{link}}",
      apiKeySubject: settings?.apiKey?.subject || "New API Key Generated",
      apiKeyContent: settings?.apiKey?.content || "Hi {{name}},\n\nA new API key has been generated for your account.",
    },
  });

  function onSubmit(values: z.infer<typeof templateSchema>) {
    onUpdate?.({
      welcome: {
        subject: values.welcomeSubject,
        content: values.welcomeContent,
      },
      passwordReset: {
        subject: values.passwordResetSubject,
        content: values.passwordResetContent,
      },
      apiKey: {
        subject: values.apiKeySubject,
        content: values.apiKeyContent,
      },
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Email Templates</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="welcome">
              <TabsList>
                <TabsTrigger value="welcome">Welcome Email</TabsTrigger>
                <TabsTrigger value="password-reset">Password Reset</TabsTrigger>
                <TabsTrigger value="api-key">API Key</TabsTrigger>
              </TabsList>

              <TabsContent value="welcome" className="space-y-4">
                <FormField
                  control={form.control}
                  name="welcomeSubject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="welcomeContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={10} />
                      </FormControl>
                      <FormDescription>
                        Available variables: {{name}}, {{company}}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <EmailTemplatePreview
                  subject={form.watch("welcomeSubject")}
                  content={form.watch("welcomeContent")}
                />
              </TabsContent>

              <TabsContent value="password-reset" className="space-y-4">
                <FormField
                  control={form.control}
                  name="passwordResetSubject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="passwordResetContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={10} />
                      </FormControl>
                      <FormDescription>
                        Available variables: {{name}}, {{link}}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <EmailTemplatePreview
                  subject={form.watch("passwordResetSubject")}
                  content={form.watch("passwordResetContent")}
                />
              </TabsContent>

              <TabsContent value="api-key" className="space-y-4">
                <FormField
                  control={form.control}
                  name="apiKeySubject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="apiKeyContent"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={10} />
                      </FormControl>
                      <FormDescription>
                        Available variables: {{name}}, {{key}}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <EmailTemplatePreview
                  subject={form.watch("apiKeySubject")}
                  content={form.watch("apiKeyContent")}
                />
              </TabsContent>
            </Tabs>

            <Button type="submit">Save Templates</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}