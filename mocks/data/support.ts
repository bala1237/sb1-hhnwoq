export const tickets = [
  {
    id: "TICK-1234",
    subject: "API Authentication Issue",
    description: "Getting 401 errors when trying to authenticate",
    status: "open",
    priority: "high",
    userId: "user_1",
    createdAt: "2024-02-20T14:30:00.000Z",
    updatedAt: "2024-02-20T14:30:00.000Z"
  },
  {
    id: "TICK-1235",
    subject: "Rate Limiting Questions",
    description: "Need clarification on rate limits",
    status: "in_progress", 
    priority: "medium",
    userId: "user_2",
    createdAt: "2024-02-19T10:00:00.000Z",
    updatedAt: "2024-02-19T15:30:00.000Z"
  }
];

export const messages = [
  {
    id: "msg_1",
    ticketId: "TICK-1234",
    content: "I'm having issues with API authentication. Getting 401 errors.",
    sender: {
      id: "user_1",
      name: "John Doe",
      avatar: "/avatars/01.png"
    },
    timestamp: "2024-02-20T14:30:00.000Z"
  },
  {
    id: "msg_2", 
    ticketId: "TICK-1234",
    content: "Could you please provide your API key and the exact error message?",
    sender: {
      id: "support_1",
      name: "Support Agent",
      avatar: "/avatars/support.png"
    },
    timestamp: "2024-02-20T14:35:00.000Z"
  }
];