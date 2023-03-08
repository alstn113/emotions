import { Module } from '@nestjs/common';
import { SESService } from './ses.service';

@Module({
  providers: [SESService],
  exports: [SESService],
})
export class SESModule {}
