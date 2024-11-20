import { NextResponse } from 'next/server';

// Mock white label settings - in production this would come from your database
const whiteLabelSettings = {
  branding: {
    companyName: "Enterprise Developer Portal",
    logo: "/logo.png",
    favicon: "/favicon.ico",
    customDomain: "https://developers.enterprise.com",
    footerText: "© 2024 Enterprise Developer Portal. All rights reserved.",
  },
  theme: {
    themeId: "modern-blue",
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
  emailTemplates: {
    welcome: {
      subject: "Welcome to {{company}}",
      content: "Welcome {{name}},\n\nThank you for joining {{company}}. Get started by..."
    },
    passwordReset: {
      subject: "Reset Your Password",
      content: "Hi {{name}},\n\nClick the link below to reset your password:\n{{link}}"
    },
    apiKey: {
      subject: "New API Key Generated",
      content: "Hi {{name}},\n\nA new API key has been generated for your account."
    }
  }
};

export async function GET() {
  try {
    return NextResponse.json(whiteLabelSettings);
  } catch (error) {
    console.error('Error fetching white label settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch white label settings' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const updates = await request.json();
    Object.assign(whiteLabelSettings, updates);
    return NextResponse.json(whiteLabelSettings);
  } catch (error) {
    console.error('Error updating white label settings:', error);
    return NextResponse.json(
      { error: 'Failed to update white label settings' },
      { status: 500 }
    );
  }
}