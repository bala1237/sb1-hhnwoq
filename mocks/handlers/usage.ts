import { http } from 'msw';
import { usageData } from '../data/usage';

export const usageHandlers = [
  http.get('/api/usage', () => {
    return Response.json(usageData);
  }),
];