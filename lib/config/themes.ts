export interface Theme {
  id: string;
  name: string;
  description: string;
  preview: string; // URL to theme preview image
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    card: string;
  };
}

export const predefinedThemes: Theme[] = [
  {
    id: "modern-blue",
    name: "Modern Blue",
    description: "Clean and professional blue-based theme",
    preview: "https://images.unsplash.com/photo-1557683311-eac922347aa1?w=200&h=100&fit=crop",
    colors: {
      primary: "#2563eb",
      secondary: "#64748b",
      accent: "#0ea5e9",
      background: "#ffffff",
      foreground: "#0f172a",
      muted: "#f1f5f9",
      card: "#ffffff"
    }
  },
  {
    id: "forest-green",
    name: "Forest Green",
    description: "Nature-inspired green theme",
    preview: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=200&h=100&fit=crop",
    colors: {
      primary: "#16a34a",
      secondary: "#4b5563",
      accent: "#22c55e",
      background: "#ffffff",
      foreground: "#1e293b",
      muted: "#f1f5f9",
      card: "#ffffff"
    }
  },
  {
    id: "deep-purple",
    name: "Deep Purple",
    description: "Rich purple theme with high contrast",
    preview: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=200&h=100&fit=crop",
    colors: {
      primary: "#7c3aed",
      secondary: "#6b7280",
      accent: "#8b5cf6",
      background: "#ffffff",
      foreground: "#1e1b4b",
      muted: "#f5f3ff",
      card: "#ffffff"
    }
  },
  {
    id: "sunset-orange",
    name: "Sunset Orange",
    description: "Warm and inviting orange theme",
    preview: "https://images.unsplash.com/photo-1520209759809-a9bcb6cb3241?w=200&h=100&fit=crop",
    colors: {
      primary: "#ea580c",
      secondary: "#64748b",
      accent: "#f97316",
      background: "#ffffff",
      foreground: "#431407",
      muted: "#fff7ed",
      card: "#ffffff"
    }
  },
  {
    id: "dark-mode",
    name: "Dark Mode",
    description: "Modern dark theme",
    preview: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=200&h=100&fit=crop",
    colors: {
      primary: "#e2e8f0",
      secondary: "#94a3b8",
      accent: "#38bdf8",
      background: "#0f172a",
      foreground: "#f8fafc",
      muted: "#1e293b",
      card: "#1e293b"
    }
  }
];