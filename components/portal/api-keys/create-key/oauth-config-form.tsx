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
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, X } from "lucide-react";
import type { ApiKeyFormData } from "../create-api-key-dialog";

const formSchema = z.object({
  redirectUrls: z.array(z.string().url()),
  allowedDomains: z.array(z.string()),
  scopes: z.array(z.string()),
});

interface OAuthConfigFormProps {
  data: ApiKeyFormData;
  onUpdate: (data: Partial<ApiKeyFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function OAuthConfigForm({ data, onUpdate, onNext, onBack }: OAuthConfigFormProps) {
  const [newRedirectUrl, setNewRedirectUrl] = useState("");
  const [newDomain, setNewDomain] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      redirectUrls: data.redirectUrls || [],
      allowedDomains: data.allowedDomains || [],
      scopes: data.scopes || [],
    },
  });

  const availableScopes = [
    { id: "read:users", label: "Read Users" },
    { id: "write:users", label: "Write Users" },
    { id: "read:orders", label: "Read Orders" },
    { id: "write:orders", label: "Write Orders" },
    { id: "read:products", label: "Read Products" },
    { id: "write:products", label: "Write Products" },
  ];

  const addRedirectUrl = () => {
    if (newRedirectUrl && form.getValues().redirectUrls.indexOf(newRedirectUrl) === -1) {
      const updatedUrls = [...form.getValues().redirectUrls, newRedirectUrl];
      form.setValue("redirectUrls", updatedUrls);
      setNewRedirectUrl("");
    }
  };

  const removeRedirectUrl = (url: string) => {
    const updatedUrls = form.getValues().redirectUrls.filter((u) => u !== url);
    form.setValue("redirectUrls", updatedUrls);
  };

  const addDomain = () => {
    if (newDomain && form.getValues().allowedDomains.indexOf(newDomain) === -1) {
      const updatedDomains = [...form.getValues().allowedDomains, newDomain];
      form.setValue("allowedDomains", updatedDomains);
      setNewDomain("");
    }
  };

  const removeDomain = (domain: string) => {
    const updatedDomains = form.getValues().allowedDomains.filter((d) => d !== domain);
    form.setValue("allowedDomains", updatedDomains);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    onUpdate(values);
    onNext();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
        <FormField
          control={form.control}
          name="redirectUrls"
          render={() => (
            <FormItem>
              <FormLabel>Redirect URLs</FormLabel>
              <FormDescription>
                Add allowed OAuth redirect URLs for this application
              </FormDescription>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="https://example.com/callback"
                    value={newRedirectUrl}
                    onChange={(e) => setNewRedirectUrl(e.target.value)}
                  />
                  <Button type="button" onClick={addRedirectUrl}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {form.watch("redirectUrls").map((url) => (
                    <div
                      key={url}
                      className="flex items-center justify-between rounded-md border p-2"
                    >
                      <code className="text-sm">{url}</code>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeRedirectUrl(url)}
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
          name="allowedDomains"
          render={() => (
            <FormItem>
              <FormLabel>Allowed Domains</FormLabel>
              <FormDescription>
                Add domains that are allowed to use this API key
              </FormDescription>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="example.com"
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value)}
                  />
                  <Button type="button" onClick={addDomain}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {form.watch("allowedDomains").map((domain) => (
                    <div
                      key={domain}
                      className="flex items-center justify-between rounded-md border p-2"
                    >
                      <code className="text-sm">{domain}</code>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDomain(domain)}
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
          name="scopes"
          render={() => (
            <FormItem>
              <FormLabel>API Scopes</FormLabel>
              <FormDescription>
                Select the permissions for this API key
              </FormDescription>
              <div className="grid grid-cols-2 gap-4">
                {availableScopes.map((scope) => (
                  <FormField
                    key={scope.id}
                    control={form.control}
                    name="scopes"
                    render={({ field }) => (
                      <FormItem
                        key={scope.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(scope.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, scope.id])
                                : field.onChange(
                                    field.value?.filter((value) => value !== scope.id)
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {scope.label}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Previous Step
          </Button>
          <Button type="submit">Next Step</Button>
        </div>
      </form>
    </Form>
  );
}