export type InternalRole = 
  | 'enterprise_admin'     // Full platform access
  | 'enterprise_support'   // Support and customer service
  | 'enterprise_security'  // Security and compliance
  | 'enterprise_custom';   // Custom enterprise roles

export type ExternalRole =
  | 'org_admin'      // Organization administration
  | 'org_developer'  // API access and development
  | 'org_viewer';    // Read-only access

export interface BaseUser {
  id: string;
  fullName: string;
  email: string;
  status: 'active' | 'inactive' | 'suspended';
  lastActive?: string;
}

export interface InternalUser extends BaseUser {
  type: 'internal';
  role: InternalRole;
  permissions: string[];
  department?: string;
}

export interface ExternalUser extends BaseUser {
  type: 'external';
  role: ExternalRole;
  organizationId: string;
  organizationName: string;
}

export type User = InternalUser | ExternalUser;