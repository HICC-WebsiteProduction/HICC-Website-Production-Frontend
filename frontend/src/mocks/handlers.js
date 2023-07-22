import { authHandlers } from './handlers/auth';
import { manageHandlers } from './handlers/manage';
import { noticeHandlers } from './handlers/notice';
import { umbrellaHandlers } from './handlers/umbrella';
import { cabinetHandlers } from './handlers/cabinet';

export const handlers = [
  ...authHandlers,
  ...manageHandlers,
  ...noticeHandlers,
  ...umbrellaHandlers,
  ...cabinetHandlers,
];
