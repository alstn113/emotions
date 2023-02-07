import { HttpException } from '@nestjs/common';

export const errors = {
  BadRequest: {
    statusCode: 400,
    message: 'Bad Request',
  },
  // 상태: 클라이언트가 인증되지 않았거나, 유효한 인증 정보가 부족하여 요청이 거부됨
  // 예시: 사용자가 로그인되지 않은 경우
  Unauthorized: {
    statusCode: 401,
    message: 'Unauthorized',
  },
  // 상태: 서버가 해당 요청을 이해했지만, 권한이 없어 요청이 거부됨
  // 예시: 사용자가 권한이 없는 요청을 하는 경우
  Forbidden: {
    statusCode: 403,
    message: 'Forbidden',
  },
  NotFound: {
    statusCode: 404,
    message: 'Not Found',
  },
  Unknown: {
    statusCode: 500,
    message: 'Unknown error',
  },
};

type ErrorName = keyof typeof errors;

export class AppErrorException extends HttpException {
  constructor(name: ErrorName, message?: string) {
    const errorInfo = errors[name];
    super(
      {
        statusCode: errorInfo.statusCode,
        message: message || errorInfo.message,
      },
      errorInfo.statusCode,
    );
  }
}
