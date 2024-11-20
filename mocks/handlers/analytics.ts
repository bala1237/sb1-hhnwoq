import { http } from 'msw';
import { usageData, errorData } from '../data/analytics';

export const analyticsHandlers = [
  http.get('/api/analytics/usage', ({ request }) => {
    const url = new URL(request.url);
    const period = url.searchParams.get('period') || '7d';
    return Response.json(usageData[period] || usageData['7d']);
  }),

  http.get('/api/analytics/errors', () => {
    return Response.json(errorData);
  })
];