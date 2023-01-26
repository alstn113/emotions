import { Module } from '@nestjs/common';
import { CommnetsService } from './commnets.service';
import { CommnetsController } from './commnets.controller';

@Module({
  controllers: [CommnetsController],
  providers: [CommnetsService]
})
export class CommnetsModule {}
