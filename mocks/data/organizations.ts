export const organizations = [
  {
    id: "org_1",
    name: "Acme Corp",
    description: "Enterprise software solutions",
    plan: "enterprise",
    status: "active",
    settings: {
      rateLimit: 10000,
      customDomain: "https://api.acme.com"
    },
    contacts: {
      technical: "tech@acme.com",
      billing: "billing@acme.com"
    },
    createdAt: "2024-01-15T00:00:00.000Z",
    updatedAt: "2024-02-20T00:00:00.000Z"
  },
  {
    id: "org_2",
    name: "TechStart Inc",
    description: "Innovative tech solutions",
    plan: "business",
    status: "active",
    settings: {
      rateLimit: 5000
    },
    contacts: {
      technical: "tech@techstart.com",
      billing: "billing@techstart.com"
    },
    createdAt: "2024-02-01T00:00:00.000Z",
    updatedAt: "2024-02-19T00:00:00.000Z"
  }
];