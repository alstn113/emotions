import { Module } from '@nestjs/common';
import { SeriesService } from './series.service';
import { SeriesController } from './series.controller';
import { SeriesRepository } from './series.repository';

@Module({
  controllers: [SeriesController],
  providers: [SeriesService, SeriesRepository],
})
export class SeriesModule {}
