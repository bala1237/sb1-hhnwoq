import { NextResponse } from 'next/server';

// Mock tickets data - in production this would come from your database
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
  try {
    return NextResponse.json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tickets' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newTicket = {
      id: `TICK-${Date.now()}`,
      status: "open",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data
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