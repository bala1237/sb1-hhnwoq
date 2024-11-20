import { NextResponse } from 'next/server';

// Mock sandbox configuration
const sandboxConfig = {
  oauth: {
    clientId: 'sandbox_client_id',
    redirectUri: 'http://localhost:3000/portal/sandbox/callback',
    scopes: ['accounts', 'payments', 'balances'],
    endpoints: {
      authorize: '/oauth/authorize',
      token: '/oauth/token'
    }
  },
  endpoints: [
    {
      path: '/v1/accounts',
      method: 'GET',
      description: 'List all accounts',
      parameters: []
    },
    {
      path: '/v1/payments',
      method: 'POST',
      description: 'Create a payment',
      parameters: [
        { name: 'amount', type: 'number', required: true },
        { name: 'currency', type: 'string', required: true }
      ]
    }
  ],
  mockData: {
    accounts: [
      {
        id: 'acc_123',
        type: 'current',
        balance: 1000.00,
        currency: 'GBP'
      }
    ]
  },
  events: [
    'payment.created',
    'payment.completed',
    'account.updated'
  ]
};

export async function GET() {
  return NextResponse.json(sandboxConfig);
}