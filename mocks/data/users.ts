export const users = [
  {
    id: "user_1",
    fullName: "John Doe",
    email: "john@acme.com",
    role: "developer",
    status: "active",
    organization: "org_1",
    lastActive: "2024-02-20T14:30:00.000Z",
    settings: {
      timezone: "America/New_York",
      language: "en",
      notifications: {
        email: true,
        slack: false
      }
    }
  },
  {
    id: "user_2",
    fullName: "Jane Smith",
    email: "jane@techstart.com",
    role: "viewer",
    status: "active",
    organization: "org_2",
    lastActive: "2024-02-20T13:15:00.000Z",
    settings: {
      timezone: "America/Los_Angeles",
      language: "en",
      notifications: {
        email: true,
        slack: true
      }
    }
  }
];