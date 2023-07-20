import { rest } from 'msw';
import user from './user.json';
import allMember from './memberInfo.json';
import notice from './notice.json';
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
    const userData = ['apple', 'banana', 'blue'];

    const isValid = !userData.find(item => item === nickname);
    if (isValid) {
      return res(ctx.json(response200(isValid)));
    } else {
      return res(ctx.json(response401(isValid)));
    }
  }),

  // 상세 멤버 불러오기
  rest.get(`${BASE_URL}/manage/memberinfo/:user`, async (req, res, ctx) => {
    const { user } = req.params;
    const allUser = allMember.memberInfo;
    const currentUser = allUser.find(member => member.nickname === user);

    const response = response200(currentUser);
    return res(ctx.json(response));
  }),

  rest.get(`${BASE_URL}/notice/:user`, async (req, res, ctx) => {
    // user에 맞는 정보를 가지고와야하니
    const { user } = req.params;
    const response = response200(notice);
    return res(ctx.json(response));
  }),

  rest.post(`${BASE_URL}/admin/member/detail`, async (req, res, ctx) => {
    const response = {
      id: 'C011001',
      role: 'EXECUTIVE',
      phoneNumber: '010-2134-2134',
      nickname: 'ezwoo',
      name: '이지우',
      major: 'computer',
    };
    return res(ctx.json(response));
  }),

  rest.post(`${BASE_URL}/admin/expel`, async (req, res, ctx) => {
    const response = 'success';
    return res(ctx.json(response));
  }),
];
