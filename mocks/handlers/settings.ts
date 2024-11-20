import { http } from 'msw';
import { settings } from '../data/settings';

export const settingsHandlers = [
  http.get('/api/settings', () => {
    return Response.json(settings);
  }),
];