import { rest } from 'msw';
import { BASE_URL } from '../../config';
import allMember from '../data/memberInfo.json';
import applicant from '../data/watingMember.json';

export const manageHandlers = [
  // 승인 대기자 조회
  rest.post(`${BASE_URL}/admin/applicant`, async (req, res, ctx) => {
    const response = applicant;
    return res(ctx.json(response));
  }),

  // 모든 회원정보 조회
  rest.post(`${BASE_URL}/admin/member`, async (req, res, ctx) => {
    const response = allMember;
    return res(ctx.json(response));
  }),

  rest.post(`${BASE_URL}/admin/member/detail`, async (req, res, ctx) => {
    const response = {
      id: 'C011001',
      role: 'PRESIDENT',
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
