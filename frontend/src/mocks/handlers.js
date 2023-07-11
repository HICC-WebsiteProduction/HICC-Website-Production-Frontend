import { rest } from 'msw';
import user from './user.json';
import { BASE_URL } from '../config';
import { response200 } from './response';

export const handlers = [
  // login success
  rest.post(`${BASE_URL}/login`, async (req, res, ctx) => {
    const response = response200(user[0]);
    console.log(response);
    return res(ctx.json(response));
  }),
];
