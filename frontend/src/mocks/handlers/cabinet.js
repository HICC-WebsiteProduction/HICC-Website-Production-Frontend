import { rest } from 'msw';
import { BASE_URL } from '../../config';
import cabinet from '../data/cabinet.json';

export const cabinetHandlers = [
  rest.get(`${BASE_URL}/locker`, async (req, res, ctx) => {
    const response = cabinet;
    return res(ctx.json(response));
  }),
];
