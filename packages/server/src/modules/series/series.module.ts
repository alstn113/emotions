import { Module } from '@nestjs/common';

import { SeriesController } from './series.controller';
import { SeriesRepository } from './series.repository';
import { SeriesService } from './series.service';

@Module({
  controllers: [SeriesController],
  providers: [SeriesService, SeriesRepository],
  exports: [SeriesService],
})
export class SeriesModule {}
