"use client";

import { createContext, useContext } from 'react';
import { useAuth as useAuthHook } from '@/lib/hooks/use-auth';

const AuthContext = createContext<ReturnType<typeof useAuthHook> | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuthHook();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}