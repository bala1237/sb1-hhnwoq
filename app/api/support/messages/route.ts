import { NextResponse } from 'next/server';

const messages = [
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

export async function GET() {
  return NextResponse.json(messages);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newMessage = {
      id: `msg_${Date.now()}`,
      ...data,
      timestamp: new Date().toISOString()
    };

    messages.push(newMessage);
    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error('Error creating message:', error);
    return NextResponse.json(
      { error: 'Failed to create message' },
      { status: 500 }
    );
  }
}