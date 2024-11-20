import { NextResponse } from 'next/server';

// Mock admin settings - in production this would come from your database
const adminSettings = {
  general: {
    portalName: "Developer Portal",
    description: "Enterprise Developer Portal for API Management",
    supportEmail: "support@company.com",
    maintenanceMode: false,
    analyticsId: "UA-XXXXXXXXX-X",
  },
  api: {
    rateLimit: "1000",
    timeout: "30",
    version: "v1",
    environment: "production",
    apiKey: "sk_test_...",
  },
  security: {
    mfaRequired: true,
    sessionTimeout: "30",
    passwordPolicy: "strong",
    ipWhitelist: "",
    corsOrigins: "*",
  }
};

export async function GET() {
  try {
    return NextResponse.json(adminSettings);
  } catch (error) {
    console.error('Error fetching admin settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin settings' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const updates = await request.json();
    Object.assign(adminSettings, updates);
    return NextResponse.json(adminSettings);
  } catch (error) {
    console.error('Error updating admin settings:', error);
    return NextResponse.json(
      { error: 'Failed to update admin settings' },
      { status: 500 }
    );
  }
}