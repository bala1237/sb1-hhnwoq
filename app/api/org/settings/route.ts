import { NextResponse } from 'next/server';

// Mock organization settings - in production this would come from your database
const orgSettings = {
  general: {
    name: "Acme Corp",
    description: "Enterprise software solutions",
    website: "https://acme.com",
    technicalContact: "tech@acme.com",
    billingContact: "billing@acme.com",
  },
  security: {
    mfaRequired: true,
    ipWhitelist: "",
    apiRateLimit: "1000",
    autoKeyRotation: false,
    keyRotationDays: "90",
    logRetentionDays: "30",
  },
  webhooks: {
    enabled: true,
    url: "https://api.acme.com/webhooks",
    secret: "whsec_...",
    retryEnabled: true,
    maxRetries: "3",
    events: [
      "api.request",
      "api.error",
      "user.added",
      "user.removed",
      "key.created",
      "key.revoked"
    ]
  }
};

export async function GET() {
  try {
    return NextResponse.json(orgSettings);
  } catch (error) {
    console.error('Error fetching organization settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch organization settings' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const updates = await request.json();
    Object.assign(orgSettings, updates);
    return NextResponse.json(orgSettings);
  } catch (error) {
    console.error('Error updating organization settings:', error);
    return NextResponse.json(
      { error: 'Failed to update organization settings' },
      { status: 500 }
    );
  }
}