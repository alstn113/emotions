import { Module } from '@nestjs/common';

import { SESController } from './ses.controller';
import { SESService } from './ses.service';

@Module({
  controllers: [SESController],
  providers: [SESService],
  exports: [SESService],
})
export class SESModule {}
