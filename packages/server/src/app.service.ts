import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  static active = true;

  hello(): string {
    if (!AppService.active) {
      throw new ForbiddenException('Emotions Server is shutting down');
    }
    return 'This is Emotions API Server. Hello!';
  }
}
