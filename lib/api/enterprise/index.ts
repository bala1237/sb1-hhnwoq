export * from './types';
export * from './organizations';
export * from './analytics';
export * from './users';
export * from './access-control';
export * from './settings';

import { organizationsApi } from './organizations';
import { analyticsApi } from './analytics';
import { usersApi } from './users';
import { accessControlApi } from './access-control';
import { settingsApi } from './settings';

export const enterpriseApi = {
  ...organizationsApi,
  ...analyticsApi,
  ...usersApi,
  ...accessControlApi,
  ...settingsApi,
};