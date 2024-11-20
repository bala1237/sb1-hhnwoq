export type UserRole = 'admin' | 'developer' | 'viewer' | 'enterprise_admin' | 'support_manager' | 'security_auditor';

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive' | 'suspended';
}

export interface Organization {
  id: string;
  name: string;
  plan: 'free' | 'pro' | 'enterprise';
  status: 'active' | 'suspended' | 'inactive';
}