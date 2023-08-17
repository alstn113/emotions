import { Injectable } from '@nestjs/common';

import { AppErrorException } from './common/exceptions';

@Injectable()
export class AppService {
  static active = true;

  hello(): string {
    if (!AppService.active) {
      throw new AppErrorException(
        'Forbidden',
        'Emotions Server is shutting down',
      );
    }
    return 'This is Emotions API Server. Hello!';
  }
}
