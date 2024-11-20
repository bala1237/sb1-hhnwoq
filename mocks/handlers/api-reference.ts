import { http } from 'msw';
import { endpoints, categories } from '../data/api-reference';

export const apiReferenceHandlers = [
  http.get('/api/reference/endpoints', () => {
    return Response.json(endpoints);
  }),

  http.get('/api/reference/categories', () => {
    return Response.json(categories);
  }),
];