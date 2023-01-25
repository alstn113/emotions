import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  static active = true;

  hello(): string {
    if (!AppService.active) {
      throw new ForbiddenException('iChat Server is shutting down');
    }
    return 'This is iChat API Server. Hello!';
  }
}
