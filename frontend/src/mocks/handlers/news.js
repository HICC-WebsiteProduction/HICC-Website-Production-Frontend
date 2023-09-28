import { rest } from 'msw';
import { BASE_URL } from '../../config';
import news from '../data/news.json';

export const newsHandler = [
  // calendar 일정 조회
  rest.get(`${BASE_URL}`, async (req, res, ctx) => {
    return res(ctx.json(news));
  }),
];
