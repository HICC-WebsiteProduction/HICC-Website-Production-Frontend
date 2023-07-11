import { rest } from 'msw';
import user from './user.json';
import { BASE_URL } from '../config';
import { response200, response401 } from './response';

export const handlers = [
  // login success
  rest.post(`${BASE_URL}/login`, async (req, res, ctx) => {
    const response = response200(user[0]);
    return res(ctx.json(response));
  }),

  rest.get(`${BASE_URL}/signup/:nickname`, async (req, res, ctx) => {
    const { nickname } = req.params;
    console.log(nickname);
    const userData = ['apple', 'banana', 'blue'];

    const isValid = !userData.find(item => item === nickname);
    if (isValid) {
      return res(ctx.json(response200(isValid)));
    } else {
      return res(ctx.json(response401(isValid)));
    }
  }),
];
