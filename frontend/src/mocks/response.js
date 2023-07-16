export const response200 = data => {
  return {
    status: 200,
    statusText: 'OK',
    headers: {
      'content-type': 'application/json',
      'x-powered-by': 'msw',
    },
    body: data,
  };
};

export const response401 = data => {
  return {
    status: 401,
    statusText: 'Unauthorized',
    headers: {
      'content-type': 'application/json',
      'x-powered-by': 'msw',
    },
    body: 'Invalid id',
  };
};
