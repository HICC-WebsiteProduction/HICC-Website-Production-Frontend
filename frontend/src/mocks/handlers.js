import { rest } from 'msw';
import user from './user.json';
import { BASE_URL } from '../config';

export const handlers = [
  rest.post(`${BASE_URL}/login`, async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(user));
  }),
];
