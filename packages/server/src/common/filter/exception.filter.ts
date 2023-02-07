import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { AppErrorException, errors } from '../exceptions/error.exceptions';

@Catch(HttpException)
export class AppErrorExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    if (exception instanceof AppErrorException) {
      return response.status(status).json(exception.getResponse());
    }

    const errorName = 'Unknown';
    const errorInfo = errors[errorName];

    response.status(status).json({
      statusCode: status,
      name: errorName,
      message: errorInfo.message,
    });
  }
}
