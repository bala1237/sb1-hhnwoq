import { NextResponse } from 'next/server';
import { defaultFeatureFlags } from '@/lib/config/feature-flags';

// Mock customer-specific feature configuration
const customerFeatures = {
  ...defaultFeatureFlags,
  modules: {
    ...defaultFeatureFlags.modules,
    enterprise: {
      enabled: true,
      submodules: {
        organizations: true,
        users: true,
        analytics: true,
        accessControl: false // Example: Access Control disabled for this customer
      }
    }
  },
  features: {
    ...defaultFeatureFlags.features,
    multiLanguage: true, // Example: Multi-language enabled for this customer
    customization: false // Example: Customization disabled for this customer
  }
};

export async function GET() {
  try {
    // In production, this would fetch from your database based on the customer ID
    return NextResponse.json(customerFeatures);
  } catch (error) {
    console.error('Error fetching features:', error);
    return NextResponse.json(
      { error: 'Failed to fetch features' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const updates = await request.json();
    
    // Validate protected modules
    if (updates.modules) {
      for (const [moduleId, config] of Object.entries(updates.modules)) {
        if (moduleId === 'admin' && !config.enabled) {
          return NextResponse.json(
            { error: 'Cannot disable admin module' },
            { status: 400 }
          );
        }
      }
    }

    // In production, this would update your database
    Object.assign(customerFeatures, updates);
    
    return NextResponse.json(customerFeatures);
  } catch (error) {
    console.error('Error updating features:', error);
    return NextResponse.json(
      { error: 'Failed to update features' },
      { status: 500 }
    );
  }
}