import { rest } from 'msw';
import notice from '../data/notice.json';
import { BASE_URL } from '../../config';
import { response200 } from '../response';

export const noticeHandlers = [
  rest.get(`${BASE_URL}/notice/:user`, async (req, res, ctx) => {
    // user에 맞는 정보를 가지고와야하니
    const { user } = req.params;
    const response = response200(notice);
    return res(ctx.json(response));
  }),
];
