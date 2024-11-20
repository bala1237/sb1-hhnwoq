import { NextResponse } from 'next/server';

export async function GET() {
  const guides = [
    {
      id: "getting-started",
      title: "Getting Started",
      description: "Learn the basics of our API",
      category: "Basics",
      timeToRead: "5 min",
      content: "Complete guide for getting started with our API...",
    },
    {
      id: "authentication",
      title: "Authentication",
      description: "Secure your API requests",
      category: "Security",
      timeToRead: "10 min",
      content: "Learn about API authentication methods...",
    },
    {
      id: "rate-limiting",
      title: "Rate Limiting",
      description: "Understanding API limits",
      category: "Usage",
      timeToRead: "7 min",
      content: "Details about rate limiting policies...",
    },
    {
      id: "webhooks",
      title: "Webhooks",
      description: "Real-time event notifications",
      category: "Integration",
      timeToRead: "15 min",
      content: "Setting up and managing webhooks...",
    },
  ];

  return NextResponse.json(guides);
}