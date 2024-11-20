"use client";

import { useFeatures } from "@/lib/hooks/use-features";
import { useEffect } from "react";

interface FeatureGuardProps {
  children: React.ReactNode;
  module?: string;
  submodule?: string;
  feature?: string;
  trackUsage?: boolean;
  fallback?: React.ReactNode;
}

export function FeatureGuard({
  children,
  module,
  submodule,
  feature,
  trackUsage = true,
  fallback = null
}: FeatureGuardProps) {
  const { 
    isModuleEnabled, 
    isSubmoduleEnabled, 
    isFeatureEnabled,
    trackFeatureUsage 
  } = useFeatures();

  useEffect(() => {
    if (trackUsage && trackFeatureUsage) {
      const featureId = feature || (submodule ? `${module}.${submodule}` : module);
      if (featureId) {
        trackFeatureUsage(featureId);
      }
    }
  }, [trackUsage, module, submodule, feature, trackFeatureUsage]);

  if (module && !isModuleEnabled(module)) {
    return fallback;
  }

  if (module && submodule && !isSubmoduleEnabled(module, submodule)) {
    return fallback;
  }

  if (feature && !isFeatureEnabled(feature)) {
    return fallback;
  }

  return <>{children}</>;
}