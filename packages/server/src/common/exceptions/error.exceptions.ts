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
  PayloadTooLarge: {
    statusCode: 413,
    message: 'Payload Too Large',
  },
  Unknown: {
    statusCode: 500,
    message: 'Unknown error',
  },
};

type ErrorName = keyof typeof errors;

export class AppErrorException extends HttpException {
  /**
   * @NotFound - 요청한 리소스가 없는 경우
   * @Unauthorized - 인증이 필요한 경우
   * @Forbidden - 권한이 없는 경우
   * @BadRequest - 잘못된 요청인 경우
   * @PayloadTooLarge - 파일 크기가 너무 큰 경우
   * @Unknown - 알 수 없는 에러인 경우
   */
  constructor(name: ErrorName, message?: string) {
    const errorInfo = errors[name];
    super(
      {
        name: name,
        statusCode: errorInfo.statusCode,
        message: message || errorInfo.message,
      },
      errorInfo.statusCode,
    );
  }
}
