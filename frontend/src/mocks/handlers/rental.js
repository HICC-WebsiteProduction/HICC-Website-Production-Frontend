import { rest } from 'msw';
import { BASE_URL } from '../../config';
import rental from '../data/rental.json';

export const rentalHandlers = [
  // 사물함, 우산 상태 조회
  rest.get(`${BASE_URL}/rental`, async (req, res, ctx) => {
    const params = new URLSearchParams(req.url.search);
    const itemType = params.get('itemType');

    const response = rental.filter(item => item.itemType === itemType);
    return await res(ctx.json(response));
  }),

  // 사물함, 우산 상태 변경
  rest.patch(`${BASE_URL}/rental/:id`, async (req, res, ctx) => {
    const { id } = req.params;

    const response = `${id} success`;
    return res(ctx.json(response));
  }),
];
