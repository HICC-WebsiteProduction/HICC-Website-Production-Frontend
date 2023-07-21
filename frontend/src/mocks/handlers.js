import { authHandlers } from './handlers/auth';
import { manageHandlers } from './handlers/manage';
import { noticeHandlers } from './handlers/notice';

export const handlers = [...authHandlers, ...manageHandlers, ...noticeHandlers];
