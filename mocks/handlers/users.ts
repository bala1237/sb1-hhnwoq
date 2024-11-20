import { http } from 'msw';
import { users } from '../data/users';

export const userHandlers = [
  http.get('/api/users', () => {
    return Response.json(users);
  }),

  http.get('/api/users/:id', ({ params }) => {
    const user = users.find(u => u.id === params.id);
    if (!user) {
      return new Response(null, { status: 404 });
    }
    return Response.json(user);
  }),

  http.post('/api/users', async ({ request }) => {
    const data = await request.json();
    const newUser = {
      ...data,
      id: `user_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    return Response.json(newUser, { status: 201 });
  })
];