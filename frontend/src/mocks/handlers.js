import { authHandlers } from './handlers/auth';
import { manageHandlers } from './handlers/manage';
import { noticeHandlers } from './handlers/notice';
import { umbrellaHandlers } from './handlers/umbrella';

export const handlers = [
  ...authHandlers,
  ...manageHandlers,
  ...noticeHandlers,
  ...umbrellaHandlers,
];
