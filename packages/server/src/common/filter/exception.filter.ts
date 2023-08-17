import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';

import { AppErrorException } from '../exceptions';

@Catch(HttpException)
export class AppErrorExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    Logger.error(exception.getResponse());

    if (exception instanceof AppErrorException) {
      return response.status(status).json(exception.getResponse());
    }

    // class validator를 위한 코드
    if (status == 400) {
      const message = Array.isArray(exception.getResponse()['message'])
        ? exception.getResponse()['message'][0]
        : exception.getResponse()['message'] || 'Bad Request';

      return response.status(status).json({
        name: 'BadRequest',
        message,
        statusCode: status,
      });
    }

    // multer file size limit custom이 없음 ㅠㅠ
    if (status === 413) {
      return response.status(status).json({
        name: 'PayloadTooLarge',
        message: 'Payload Too Large',
        statusCode: status,
      });
    }

    response.status(500).json({
      name: 'Unknown',
      statusCode: 500,
      message: 'Unknown error',
    });
  }
}
