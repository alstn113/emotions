import { Injectable } from '@nestjs/common';
import { CreateSeriestDto } from './dto/create-series.dto';
import { SeriesRepository } from './series.repository';

@Injectable()
export class SeriesService {
  constructor(private readonly seriesRepository: SeriesRepository) {}

  async getSeriesById(seriesId: string) {
    return await this.seriesRepository.findSeriesById(seriesId);
  }

  async getUserSeries(userId: string) {
    return await this.seriesRepository.findUserSeries(userId);
  }

  async createSeries(dto: CreateSeriestDto, userId: string) {
    return await this.seriesRepository.createSeries(dto, userId);
  }

  async deleteSeries(seriesId: string, userId: string) {
    return await this.seriesRepository.deleteSeries(seriesId, userId);
  }

  async appendPostToSeries(seriesId: string, postId: string, userId: string) {
    return await this.seriesRepository.appendPostToSeries(
      seriesId,
      postId,
      userId,
    );
  }
}
