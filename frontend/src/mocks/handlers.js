import { authHandlers } from './handlers/auth';
import { manageHandlers } from './handlers/manage';
import { noticeHandlers } from './handlers/notice';
import { umbrellaHandlers } from './handlers/umbrella';
import { cabinetHandlers } from './handlers/cabinet';

// 핸들러를 추가해서 스프레드 연산자로 추가해주면 됩니다.
export const handlers = [
  ...authHandlers,
  ...manageHandlers,
  ...noticeHandlers,
  ...umbrellaHandlers,
  ...cabinetHandlers,
];
