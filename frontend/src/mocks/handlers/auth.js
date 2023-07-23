import { rest } from 'msw';
import user from '../data/user.json';
import { BASE_URL } from '../../config';
import { response200, response401 } from '../response';

export const authHandlers = [
  // 로그인 기능
  rest.post(`${BASE_URL}/login`, async (req, res, ctx) => {
    const response = response200(user[0]);
    return res(ctx.json(response));
  }),

  // 닉네임 중복체크
  rest.get(`${BASE_URL}/signup/:nickname`, async (req, res, ctx) => {
    const { nickname } = req.params;
    const userData = ['apple', 'banana', 'blue'];

    const isValid = !userData.find(item => item === nickname);
    if (isValid) {
      return res(ctx.json(response200(isValid)));
    } else {
      return res(ctx.json(response401(isValid)));
    }
  }),
];
