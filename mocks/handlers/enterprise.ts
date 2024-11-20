import { http } from 'msw';
import { organizations } from '../data/organizations';

export const enterpriseHandlers = [
  // Organizations
  http.get('/api/enterprise/organizations', () => {
    return Response.json(organizations);
  }),

  http.get('/api/enterprise/organizations/:id', ({ params }) => {
    const org = organizations.find(o => o.id === params.id);
    if (!org) {
      return new Response(null, { status: 404 });
    }
    return Response.json(org);
  }),

  http.post('/api/enterprise/organizations', async ({ request }) => {
    const data = await request.json();
    const newOrg = {
      ...data,
      id: `org_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active',
      apiKeys: []
    };
    organizations.push(newOrg);
    return Response.json(newOrg, { status: 201 });
  }),

  http.put('/api/enterprise/organizations/:id', async ({ params, request }) => {
    const data = await request.json();
    const index = organizations.findIndex(org => org.id === params.id);
    if (index === -1) {
      return new Response(null, { status: 404 });
    }
    organizations[index] = {
      ...organizations[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    return Response.json(organizations[index]);
  }),

  http.put('/api/enterprise/organizations/:id/update-plan', async ({ params, request }) => {
    const data = await request.json();
    const index = organizations.findIndex(org => org.id === params.id);
    if (index === -1) {
      return new Response(null, { status: 404 });
    }
    organizations[index] = {
      ...organizations[index],
      plan: data.plan,
      settings: {
        ...organizations[index].settings,
        rateLimit: data.settings.rateLimit
      },
      updatedAt: new Date().toISOString()
    };
    return Response.json(organizations[index]);
  }),

  http.post('/api/enterprise/organizations/:id/reset-keys', ({ params }) => {
    const index = organizations.findIndex(org => org.id === params.id);
    if (index === -1) {
      return new Response(null, { status: 404 });
    }
    organizations[index] = {
      ...organizations[index],
      apiKeys: [],
      updatedAt: new Date().toISOString()
    };
    return Response.json(organizations[index]);
  }),

  http.put('/api/enterprise/organizations/:id/status', async ({ params, request }) => {
    const data = await request.json();
    const index = organizations.findIndex(org => org.id === params.id);
    if (index === -1) {
      return new Response(null, { status: 404 });
    }
    organizations[index] = {
      ...organizations[index],
      status: data.status,
      updatedAt: new Date().toISOString()
    };
    return Response.json(organizations[index]);
  }),

  // Analytics
  http.get('/api/enterprise/analytics/usage', () => {
    return Response.json({
      totalCalls: 2500000,
      successRate: 99.9,
      errorRate: 0.1,
      avgLatency: 45,
      timeline: [
        { date: '2024-02-14', calls: 180000, errors: 180 },
        { date: '2024-02-15', calls: 200000, errors: 200 },
        { date: '2024-02-16', calls: 250000, errors: 250 },
        { date: '2024-02-17', calls: 280000, errors: 280 },
        { date: '2024-02-18', calls: 310000, errors: 310 },
        { date: '2024-02-19', calls: 350000, errors: 350 },
        { date: '2024-02-20', calls: 400000, errors: 400 }
      ],
      organizations: [
        { id: 'org_1', name: 'Acme Corp', usage: 850000, limit: 1000000 },
        { id: 'org_2', name: 'TechStart Inc', usage: 450000, limit: 500000 }
      ]
    });
  }),

  // Users
  http.get('/api/enterprise/users', () => {
    return Response.json([
      {
        id: 'user_1',
        fullName: 'John Doe',
        email: 'john@example.com',
        role: 'enterprise_admin',
        status: 'active',
        organizations: [{ id: 'org_1', role: 'admin', status: 'active' }],
        lastActive: '2024-02-20T14:30:00Z'
      },
      {
        id: 'user_2',
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        role: 'support_manager',
        status: 'active',
        organizations: [{ id: 'org_1', role: 'member', status: 'active' }],
        lastActive: '2024-02-20T13:45:00Z'
      }
    ]);
  }),

  // Access Control
  http.get('/api/enterprise/policies', () => {
    return Response.json([
      {
        id: 'policy_1',
        name: 'API Rate Limiting',
        description: 'Controls API request limits per organization',
        type: 'system',
        scope: 'global',
        status: 'active',
        rules: []
      },
      {
        id: 'policy_2',
        name: 'Data Access',
        description: 'Defines data access levels for different roles',
        type: 'custom',
        scope: 'organization',
        status: 'active',
        rules: []
      }
    ]);
  })
];