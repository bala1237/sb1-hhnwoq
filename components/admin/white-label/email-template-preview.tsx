"use client";

import { Card } from "@/components/ui/card";

interface EmailTemplatePreviewProps {
  subject: string;
  content: string;
}

export function EmailTemplatePreview({
  subject,
  content,
}: EmailTemplatePreviewProps) {
  const previewContent = content
    .replace("{{name}}", "John Doe")
    .replace("{{company}}", "Your Company")
    .replace("{{link}}", "https://example.com");

  const previewSubject = subject
    .replace("{{name}}", "John Doe")
    .replace("{{company}}", "Your Company");

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium mb-1">Preview</h4>
          <div className="text-sm text-muted-foreground border-b pb-2">
            <div>
              <span className="font-medium">Subject:</span> {previewSubject}
            </div>
          </div>
        </div>
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <div style={{ whiteSpace: "pre-wrap" }}>{previewContent}</div>
        </div>
      </div>
    </Card>
  );
}