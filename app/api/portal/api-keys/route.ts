import { NextResponse } from 'next/server';

// Mock data for development
const apiKeys = [
  {
    id: "key_1",
    name: "Production API Key",
    key: "sk_prod_123...",
    fullKey: "sk_prod_1234567890abcdef1234567890abcdef",
    created: "2024-02-20",
    lastUsed: "2024-02-20",
    status: "active",
  },
  {
    id: "key_2",
    name: "Development API Key",
    key: "sk_dev_456...",
    fullKey: "sk_dev_1234567890abcdef1234567890abcdef",
    created: "2024-02-19",
    lastUsed: "2024-02-20",
    status: "active",
  }
];

export async function GET() {
  return NextResponse.json(apiKeys);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newKey = {
      id: `key_${Date.now()}`,
      ...data,
      created: new Date().toISOString().split('T')[0],
      lastUsed: new Date().toISOString().split('T')[0],
      status: "active"
    };
    apiKeys.push(newKey);
    return NextResponse.json(newKey, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create API key' },
      { status: 500 }
    );
  }
}