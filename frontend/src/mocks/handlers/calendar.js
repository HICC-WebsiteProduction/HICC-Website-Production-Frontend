import { rest } from 'msw';
import { BASE_URL } from '../../config';
import calendar from '../data/calendar.json';
import allMember from '../data/memberInfo.json';

export const calendarHandlers = [
  // calendar 일정 조회
  rest.get(`${BASE_URL}/calendar`, async (req, res, ctx) => {
    const response = calendar;
    return res(ctx.json(response));
  }),

  rest.post(`${BASE_URL}/calendar/addPlan`, async (req, res, ctx) => {
    const response = allMember.find(member => member.role === 'PRESIDENT');
    return res(ctx.json(response));
  }),
];
