"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeSelector } from "./theme-selector";
import { ThemePreview } from "./theme-preview";
import { ColorPicker } from "./color-picker";
import { Button } from "@/components/ui/button";
import { predefinedThemes, type Theme } from "@/lib/config/themes";

interface ThemeSettingsProps {
  settings: any;
  onUpdate?: (settings: any) => void;
}

export function ThemeSettings({ settings, onUpdate }: ThemeSettingsProps) {
  const [selectedTheme, setSelectedTheme] = useState<Theme>(
    predefinedThemes.find(t => t.id === settings?.themeId) || predefinedThemes[0]
  );
  const [customColors, setCustomColors] = useState({
    primary: settings?.colors?.primary || selectedTheme.colors.primary,
    secondary: settings?.colors?.secondary || selectedTheme.colors.secondary,
    accent: settings?.colors?.accent || selectedTheme.colors.accent,
  });

  const handleThemeChange = (theme: Theme) => {
    setSelectedTheme(theme);
    setCustomColors(theme.colors);
    onUpdate?.({
      themeId: theme.id,
      colors: theme.colors,
    });
  };

  const handleColorChange = (key: string, color: { hex: string }) => {
    setCustomColors(prev => ({
      ...prev,
      [key]: color.hex,
    }));
    onUpdate?.({
      themeId: selectedTheme.id,
      colors: {
        ...customColors,
        [key]: color.hex,
      },
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Theme Selection</CardTitle>
        </CardHeader>
        <CardContent>
          <ThemeSelector
            value={selectedTheme.id}
            onChange={handleThemeChange}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Color Customization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Primary Color</label>
                <ColorPicker
                  color={customColors.primary}
                  onChange={(color) => handleColorChange("primary", color)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Secondary Color</label>
                <ColorPicker
                  color={customColors.secondary}
                  onChange={(color) => handleColorChange("secondary", color)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Accent Color</label>
                <ColorPicker
                  color={customColors.accent}
                  onChange={(color) => handleColorChange("accent", color)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Theme Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <ThemePreview
            primaryColor={customColors.primary}
            secondaryColor={customColors.secondary}
            accentColor={customColors.accent}
          />
        </CardContent>
      </Card>
    </div>
  );
}