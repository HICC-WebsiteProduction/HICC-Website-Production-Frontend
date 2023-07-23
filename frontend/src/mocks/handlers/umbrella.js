import { rest } from 'msw';
import { BASE_URL } from '../../config';
import umbrella from '../data/umbrella.json';

export const umbrellaHandlers = [
  // 우산 상태 조회
  rest.get(`${BASE_URL}/umbrella`, async (req, res, ctx) => {
    const response = umbrella;
    return res(ctx.json(response));
  }),

  // 우산 대여
  rest.post(`${BASE_URL}/umbrella/rent`, async (req, res, ctx) => {
    const response = 'success';
    return res(ctx.json(response));
  }),

  // 우산 반납
  rest.post(`${BASE_URL}/umbrella/return`, async (req, res, ctx) => {
    const response = 'success';
    return res(ctx.json(response));
  }),
];
