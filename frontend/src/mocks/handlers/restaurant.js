import { rest } from 'msw';
import { BASE_URL } from '../../config';
import restaurant from '../data/restaurant.json';

export const restaurantHandlers = [
  // 맛집 리스트 조회
  rest.get(`${BASE_URL}/noticeboard/restaurant`, async (req, res, ctx) => {
    const response = restaurant;
    return res(ctx.json(response));
  }),
];
