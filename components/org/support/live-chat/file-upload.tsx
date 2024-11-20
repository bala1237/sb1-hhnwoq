"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Paperclip } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/pdf",
  "text/plain",
];

export function FileUpload() {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleUpload = async (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File too large",
        description: "Maximum file size is 5MB",
        variant: "destructive",
      });
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image, PDF, or text file",
        variant: "destructive",
      });
      return;
    }

    try {
      setUploading(true);
      // Upload logic here
      // const response = await uploadFile(file);
      toast({
        title: "File uploaded",
        description: "Your file has been uploaded successfully",
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={uploading}
      onClick={() => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ALLOWED_TYPES.join(",");
        input.onchange = (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (file) {
            handleUpload(file);
          }
        };
        input.click();
      }}
    >
      <Paperclip className="h-4 w-4" />
    </Button>
  );
}