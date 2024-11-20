import { NextResponse } from 'next/server';

// Mock enterprise settings - in production this would come from your database
const settings = {
  general: {
    portalName: "Enterprise Developer Portal",
    description: "Central hub for API management and developer resources",
    supportEmail: "enterprise-support@company.com",
    maintenanceMode: false,
    analyticsId: "UA-XXXXXXXXX-X",
    defaultTimeZone: "UTC",
    customDomain: "https://developers.enterprise.com",
  },
  api: {
    globalRateLimit: "10000",
    defaultTimeout: "30",
    defaultVersion: "v1",
    environment: "production",
    masterApiKey: "ent_master_key_...",
    webhookUrl: "https://api.enterprise.com/webhooks",
    retryAttempts: "3",
  },
  security: {
    mfaRequired: true,
    sessionTimeout: "30",
    passwordPolicy: "strong",
    ipWhitelist: "",
    corsOrigins: "*",
    ssoEnabled: true,
    ssoProvider: "okta",
    auditLogRetention: "90",
  }
};

export async function GET() {
  try {
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching enterprise settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch enterprise settings' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const updates = await request.json();
    Object.assign(settings, updates);
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error updating enterprise settings:', error);
    return NextResponse.json(
      { error: 'Failed to update enterprise settings' },
      { status: 500 }
    );
  }
}