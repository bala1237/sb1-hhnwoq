export const settings = {
  personal: {
    fullName: "John Doe",
    email: "john@acme.com",
    timezone: "America/New_York",
    language: "en",
    company: "Acme Corp",
    role: "Developer"
  },
  notifications: {
    emailNotifications: true,
    apiKeyExpiration: true,
    usageAlerts: true,
    securityAlerts: true,
    maintenanceUpdates: true,
    productUpdates: false,
    marketingEmails: false
  },
  api: {
    defaultVersion: "v1",
    webhookUrl: "https://api.acme.com/webhooks",
    retryEnabled: true,
    maxRetries: "3",
    ipWhitelist: "",
    customDomain: "https://api.acme.com"
  }
};