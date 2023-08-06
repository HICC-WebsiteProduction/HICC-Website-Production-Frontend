import { rest } from 'msw';
import { BASE_URL } from '../../config';
import umbrella from '../data/umbrella.json';

export const umbrellaHandlers = [
  rest.get(`${BASE_URL}/umbrella`, async (req, res, ctx) => {
    const response = umbrella;
    return res(ctx.json(response));
  }),
];
