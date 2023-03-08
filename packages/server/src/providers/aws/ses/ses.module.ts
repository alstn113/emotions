import { Module } from '@nestjs/common';
import { SesController } from './ses.controller';
import { SESService } from './ses.service';

@Module({
  controllers: [SesController],
  providers: [SESService],
  exports: [SESService],
})
export class SESModule {}
