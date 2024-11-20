import { NextResponse } from 'next/server';

const tickets = [
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

export async function GET() {
  return NextResponse.json(tickets);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newTicket = {
      id: `TICK-${Date.now()}`,
      ...data,
      status: "open",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    tickets.push(newTicket);
    return NextResponse.json(newTicket, { status: 201 });
  } catch (error) {
    console.error('Error creating ticket:', error);
    return NextResponse.json(
      { error: 'Failed to create ticket' },
      { status: 500 }
    );
  }
}