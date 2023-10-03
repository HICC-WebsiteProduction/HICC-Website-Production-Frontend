import { rest } from 'msw';
import { BASE_URL } from '../../config';
import cabinet from '../data/cabinet.json';

export const cabinetHandlers = [
  // 사물함 상태 조회
  rest.get(`${BASE_URL}/locker`, async (req, res, ctx) => {
    const response = cabinet;
    return res(ctx.json(response));
  }),

  // 사물함 대여
  rest.post(`${BASE_URL}/locker/rent`, async (req, res, ctx) => {
    const response = 'success';
    return res(ctx.json(response));
  }),

  // 사물함 반납
  rest.post(`${BASE_URL}/locker/return`, async (req, res, ctx) => {
    const response = 'success';
    return res(ctx.json(response));
  }),
];
