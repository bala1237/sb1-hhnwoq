import { NextResponse } from 'next/server';
import { PROTECTED_MODULES, PROTECTED_FEATURES } from '@/lib/config/feature-flags';

export async function PUT(request: Request) {
  try {
    const updates = await request.json();
    
    // Validate protected modules and features
    if (updates.modules) {
      for (const [moduleId, config] of Object.entries(updates.modules)) {
        if (PROTECTED_MODULES.includes(moduleId)) {
          // Prevent disabling protected modules
          if (config.enabled === false) {
            return NextResponse.json(
              { error: 'Cannot disable protected modules' },
              { status: 400 }
            );
          }
          
          // Prevent modifying protected module access
          if (config.access && moduleId === 'admin') {
            return NextResponse.json(
              { error: 'Cannot modify admin module access configuration' },
              { status: 400 }
            );
          }
        }
      }
    }

    if (updates.features) {
      for (const [featureId, enabled] of Object.entries(updates.features)) {
        if (PROTECTED_FEATURES.includes(featureId) && !enabled) {
          return NextResponse.json(
            { error: 'Cannot disable protected features' },
            { status: 400 }
          );
        }
      }
    }

    // If validation passes, apply updates
    // In production, this would update your database
    return NextResponse.json({
      success: true,
      message: 'Features updated successfully'
    });
  } catch (error) {
    console.error('Error updating features:', error);
    return NextResponse.json(
      { error: 'Failed to update features' },
      { status: 500 }
    );
  }
}