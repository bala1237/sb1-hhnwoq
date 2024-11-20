import { http } from 'msw';
import { guides, popularTopics } from '../data/docs';

export const docsHandlers = [
  http.get('/api/guides', () => {
    return Response.json(guides);
  }),

  http.get('/api/popularTopics', () => {
    return Response.json(popularTopics);
  }),
];