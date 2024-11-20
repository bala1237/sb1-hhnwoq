"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  color: string;
  onChange: (color: { hex: string }) => void;
}

const presetColors = [
  "#000000", // Black
  "#ffffff", // White
  "#ff0000", // Red
  "#00ff00", // Green
  "#0000ff", // Blue
  "#ffff00", // Yellow
  "#ff00ff", // Magenta
  "#00ffff", // Cyan
  "#888888", // Gray
  "#cccccc", // Light Gray
  "#ff8800", // Orange
  "#88ff00", // Lime
  "#0088ff", // Sky Blue
  "#ff0088", // Pink
  "#8800ff", // Purple
  "#00ff88", // Mint
];

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !color && "text-muted-foreground"
          )}
        >
          <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: color }} />
          <span>{color}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-3">
        <div className="grid gap-4">
          <div className="grid grid-cols-8 gap-2">
            {presetColors.map((presetColor) => (
              <button
                key={presetColor}
                className={cn(
                  "w-6 h-6 rounded-md border border-gray-200",
                  color === presetColor && "ring-2 ring-primary"
                )}
                style={{ backgroundColor: presetColor }}
                onClick={() => {
                  onChange({ hex: presetColor });
                  setIsOpen(false);
                }}
              />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}