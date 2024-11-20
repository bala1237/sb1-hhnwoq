import { http } from 'msw';
import { tickets, messages } from '../data/support';

export const supportHandlers = [
  http.get('/api/tickets', () => {
    return Response.json(tickets);
  }),

  http.get('/api/messages', () => {
    return Response.json(messages);
  }),

  http.get('/api/tickets/:id', ({ params }) => {
    const ticket = tickets.find(t => t.id === params.id);
    if (!ticket) {
      return new Response(null, { status: 404 });
    }
    const ticketMessages = messages.filter(m => m.ticketId === params.id);
    return Response.json({ ticket, messages: ticketMessages });
  }),

  http.post('/api/tickets', async ({ request }) => {
    const data = await request.json();
    const newTicket = {
      ...data,
      id: `TICK-${Date.now()}`,
      status: 'open',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    tickets.push(newTicket);
    return Response.json(newTicket, { status: 201 });
  }),
];