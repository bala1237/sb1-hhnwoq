"use client";

import { useEffect, useState, useMemo } from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

interface SwaggerUIWrapperProps {
  spec: any;
}

export function SwaggerUIWrapper({ spec }: SwaggerUIWrapperProps) {
  const [mounted, setMounted] = useState(false);

  // Memoize the configuration to prevent unnecessary re-renders
  const swaggerConfig = useMemo(() => ({
    spec,
    defaultModelsExpandDepth: -1,
    docExpansion: "list",
    filter: true,
    tryItOutEnabled: true,
    supportedSubmitMethods: ["get", "post", "put", "delete", "patch"],
    persistAuthorization: true,
    displayRequestDuration: true,
    onComplete: () => {
      // Handle any post-load initialization
    },
    // Suppress legacy lifecycle warnings in development
    showMutatedRequest: true,
    deepLinking: true,
    presets: [
      SwaggerUI.presets.apis,
      // Custom preset to handle state updates
      () => ({
        statePlugins: {
          spec: {
            wrapSelectors: {
              isOAS3: () => () => true
            }
          }
        }
      })
    ],
    plugins: [
      // Custom plugin to handle component updates
      () => ({
        components: {
          OperationContainer: (Original: any) => (props: any) => {
            // Use hooks for state management instead of legacy lifecycle methods
            const [state, setState] = useState(props);
            
            useEffect(() => {
              setState(props);
            }, [props]);

            return <Original {...state} />;
          }
        }
      })
    ]
  }), [spec]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="swagger-ui-wrapper">
      <SwaggerUI {...swaggerConfig} />
    </div>
  );
}