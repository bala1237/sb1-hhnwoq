"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Download, Upload } from "lucide-react";
import { predefinedThemes, type Theme } from "@/lib/config/themes";
import { cn } from "@/lib/utils";

interface ThemeSelectorProps {
  value: string;
  onChange: (theme: Theme) => void;
}

export function ThemeSelector({ value, onChange }: ThemeSelectorProps) {
  const [selectedId, setSelectedId] = useState(value);

  const handleThemeSelect = (theme: Theme) => {
    setSelectedId(theme.id);
    onChange(theme);
  };

  const exportTheme = () => {
    const theme = predefinedThemes.find(t => t.id === selectedId);
    if (!theme) return;

    const blob = new Blob([JSON.stringify(theme, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `theme-${theme.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const theme = JSON.parse(e.target?.result as string);
        onChange(theme);
      } catch (err) {
        console.error('Error importing theme:', err);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={exportTheme}>
          <Download className="mr-2 h-4 w-4" />
          Export Theme
        </Button>
        <Button variant="outline" asChild>
          <label>
            <Upload className="mr-2 h-4 w-4" />
            Import Theme
            <input
              type="file"
              className="hidden"
              accept=".json"
              onChange={importTheme}
            />
          </label>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {predefinedThemes.map((theme) => (
          <Card
            key={theme.id}
            className={cn(
              "cursor-pointer transition-all hover:scale-[1.02]",
              selectedId === theme.id && "ring-2 ring-primary"
            )}
            onClick={() => handleThemeSelect(theme)}
          >
            <CardContent className="p-4 space-y-4">
              <div className="aspect-video rounded-lg overflow-hidden">
                <img
                  src={theme.preview}
                  alt={theme.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{theme.name}</h3>
                  {selectedId === theme.id && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {theme.description}
                </p>
              </div>
              <div className="flex gap-2">
                {Object.entries(theme.colors).slice(0, 4).map(([key, color]) => (
                  <div
                    key={key}
                    className="w-6 h-6 rounded-full border"
                    style={{ backgroundColor: color }}
                    title={key}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}