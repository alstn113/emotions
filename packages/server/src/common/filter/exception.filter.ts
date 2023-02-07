import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { AppErrorException } from '../exceptions';

@Catch(HttpException)
export class AppErrorExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    if (exception instanceof AppErrorException) {
      return response.status(status).json(exception.getResponse());
    }

    response.status(500).json({
      name: 'Unknown',
      statusCode: 500,
      message: 'Unknown error',
    });
  }
}
