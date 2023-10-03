import { rest } from 'msw';
import { BASE_URL } from '../../config';
import news from '../data/news.json';
import president from '../data/president.json';
import table from '../data/table.json';

export const newsHandler = [
  // calendar 일정 조회
  rest.get(`${BASE_URL}/news`, async (req, res, ctx) => {
    return res(ctx.json(news));
  }),
  rest.get(`${BASE_URL}/president`, async (req, res, ctx) => {
    return res(ctx.json(president));
  }),
  rest.get(`${BASE_URL}/table`, async (req, res, ctx) => {
    return res(ctx.json(table));
  }),
];
