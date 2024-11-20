import { NextResponse } from 'next/server';

// Mock settings data
const settings = {
  personal: {
    fullName: "John Doe",
    email: "john@acme.com",
    timezone: "America/New_York",
    language: "en",
    company: "Acme Corp",
    role: "Developer"
  },
  notifications: {
    emailNotifications: true,
    apiKeyExpiration: true,
    usageAlerts: true,
    securityAlerts: true,
    maintenanceUpdates: true,
    productUpdates: false,
    marketingEmails: false
  },
  api: {
    defaultVersion: "v1",
    webhookUrl: "https://api.acme.com/webhooks",
    retryEnabled: true,
    maxRetries: "3",
    ipWhitelist: "",
    customDomain: "https://api.acme.com"
  }
};

export async function GET() {
  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  try {
    const updates = await request.json();
    // In production, this would update the database
    Object.assign(settings, updates);
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update settings' },
      { status: 500 }
    );
  }
}