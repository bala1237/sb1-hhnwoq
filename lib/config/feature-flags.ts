export interface FeatureConfig {
  enabled: boolean;
  protected?: boolean;
  access?: {
    roles: string[];
    plans: string[];
  };
}

export interface ModuleConfig extends FeatureConfig {
  submodules: {
    [key: string]: FeatureConfig;
  };
}

export interface FeatureFlags {
  modules: {
    portal: ModuleConfig;
    enterprise: ModuleConfig;
    admin: ModuleConfig;
  };
}

export const PROTECTED_MODULES = ['admin'];

export const defaultFeatureFlags: FeatureFlags = {
  modules: {
    admin: {
      enabled: true,
      protected: true,
      access: {
        roles: ['admin'],
        plans: ['enterprise']
      },
      submodules: {
        dashboard: {
          enabled: true,
          protected: true,
          access: {
            roles: ['admin'],
            plans: ['enterprise']
          }
        },
        features: {
          enabled: true,
          protected: true,
          access: {
            roles: ['admin'],
            plans: ['enterprise']
          }
        },
        users: {
          enabled: true,
          protected: true,
          access: {
            roles: ['admin'],
            plans: ['enterprise']
          }
        },
        settings: {
          enabled: true,
          protected: true,
          access: {
            roles: ['admin'],
            plans: ['enterprise']
          }
        }
      }
    },
    portal: {
      enabled: true,
      protected: false,
      access: {
        roles: ['admin', 'developer', 'viewer'],
        plans: ['growth', 'business', 'enterprise']
      },
      submodules: {
        'api-keys': {
          enabled: true,
          access: {
            roles: ['admin', 'developer'],
            plans: ['growth', 'business', 'enterprise']
          }
        },
        sandbox: {
          enabled: true,
          access: {
            roles: ['admin', 'developer'],
            plans: ['growth', 'business', 'enterprise']
          }
        },
        usage: {
          enabled: true,
          access: {
            roles: ['admin', 'developer'],
            plans: ['business', 'enterprise']
          }
        },
        support: {
          enabled: true,
          access: {
            roles: ['admin', 'developer'],
            plans: ['business', 'enterprise']
          }
        },
        settings: {
          enabled: true,
          access: {
            roles: ['admin', 'developer'],
            plans: ['business', 'enterprise']
          }
        }
      }
    },
    enterprise: {
      enabled: true,
      protected: false,
      access: {
        roles: ['admin', 'enterprise_admin'],
        plans: ['enterprise']
      },
      submodules: {
        organizations: {
          enabled: true,
          access: {
            roles: ['admin', 'enterprise_admin'],
            plans: ['enterprise']
          }
        },
        analytics: {
          enabled: true,
          access: {
            roles: ['admin', 'enterprise_admin'],
            plans: ['enterprise']
          }
        },
        users: {
          enabled: true,
          access: {
            roles: ['admin', 'enterprise_admin'],
            plans: ['enterprise']
          }
        },
        'access-control': {
          enabled: true,
          access: {
            roles: ['admin', 'enterprise_admin'],
            plans: ['enterprise']
          }
        },
        settings: {
          enabled: true,
          access: {
            roles: ['admin', 'enterprise_admin'],
            plans: ['enterprise']
          }
        }
      }
    }
  }
};