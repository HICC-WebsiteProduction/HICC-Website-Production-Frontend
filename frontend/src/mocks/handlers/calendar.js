import { rest } from 'msw';
import { BASE_URL } from '../../config';
import calendar from '../data/calendar.json';
import allMember from '../data/memberInfo.json';

export const calendarHandlers = [
  // calendar 일정 조회
  rest.get(`${BASE_URL}/schedule`, async (req, res, ctx) => {
    const params = new URLSearchParams(req.url.search);
    const year = params.get('year');
    const month = params.get('month');

    // 필터링할 연도와 월에 해당하는 데이터만 선택
    const filteredEvents = calendar.filter(event => {
      const eventYear = new Date(event.date).getFullYear();
      const eventMonth = new Date(event.date).getMonth() + 1; // 월은 0부터 시작하므로 1을 더합니다.

      return (
        eventYear === parseInt(year, 10) && eventMonth === parseInt(month, 10)
      );
    });

    return res(ctx.json(filteredEvents));
  }),

  rest.post(`${BASE_URL}/schedule`, async (req, res, ctx) => {
    const response = allMember.find(member => member.role === 'PRESIDENT');
    return res(ctx.json(response));
  }),

  rest.patch(`${BASE_URL}/schedule`, async (req, res, ctx) => {
    const response = allMember.find(member => member.role === 'PRESIDENT');
    return res(ctx.json(response));
  }),
];
