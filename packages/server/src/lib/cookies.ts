import { Response } from 'express';

const domains =
  process.env.NODE_ENV === 'production' ? ['.wap-dev.store'] : [undefined];

export const setTokenCookie = (res: Response, token: string) => {
  // httpOnly: 브라우저에서 접근 금지
  // secure: https에서만 쿠키 전송
  // domain: 쿠키를 전송할 도메인
  const maxAge = 1000 * 60 * 60 * 24 * 1; // 1d
  domains.forEach((domain) => {
    if (process.env.NODE_ENV === 'production') {
      res.cookie('access_token', token, {
        httpOnly: true,
        secure: true,
        path: '/',
        maxAge,
        domain,
      });
    } else {
      res.cookie('access_token', token, {
        httpOnly: true,
        path: '/',
        maxAge,
        domain,
      });
    }
  });
};

export const clearTokenCookie = (res: Response) => {
  domains.forEach((domain) => {
    res.clearCookie('access_token', {
      path: '/',
      domain,
    });
  });
};
