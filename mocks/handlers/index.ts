import { docsHandlers } from './docs';
import { apiReferenceHandlers } from './api-reference';
import { usageHandlers } from './usage';
import { supportHandlers } from './support';
import { settingsHandlers } from './settings';
import { enterpriseHandlers } from './enterprise';

export const handlers = [
  ...docsHandlers,
  ...apiReferenceHandlers,
  ...usageHandlers,
  ...supportHandlers,
  ...settingsHandlers,
];