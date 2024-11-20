import { http } from 'msw';
import { organizations } from '../data/organizations';

export const organizationHandlers = [
  http.get('/api/organizations', () => {
    return Response.json(organizations);
  }),

  http.post('/api/organizations', async ({ request }) => {
    const data = await request.json();
    const newOrg = {
      ...data,
      id: `org_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    organizations.push(newOrg);
    return Response.json(newOrg, { status: 201 });
  })
];