import { rest } from 'msw';
import { BASE_URL } from '../../config';
import allMember from '../data/memberInfo.json';
import applicant from '../data/watingMember.json';

export const manageHandlers = [
  // 승인 대기자 조회
  rest.get(`${BASE_URL}/admin/applicant`, async (req, res, ctx) => {
    const response = applicant;
    return res(ctx.json(response));
  }),

  // 모든 회원정보 조회
  rest.get(`${BASE_URL}/admin/member`, async (req, res, ctx) => {
    const response = allMember;
    return res(ctx.json(response));
  }),

  // 회원 상세정보 조회
  rest.get(
    `${BASE_URL}/admin/member/detail/:nickname`,
    async (req, res, ctx) => {
      const { nickname } = req.params;
      const response = allMember.find(member => member.nickname === nickname);
      return res(ctx.json(response));
    },
  ),

  // 회원 강퇴
  rest.post(`${BASE_URL}/admin/expel`, async (req, res, ctx) => {
    const response = 'success';
    return res(ctx.json(response));
  }),
];
