import { Injectable } from '@nestjs/common';
import { AppErrorException } from '~/common/exceptions';
import { CreateSeriestDto } from './dto/create-series.dto';
import { SeriesRepository } from './series.repository';

@Injectable()
export class SeriesService {
  constructor(private readonly seriesRepository: SeriesRepository) {}

  async getUserSeriesList(userId: string) {
    return await this.seriesRepository.findUserSeriesList(userId);
  }

  async getSeriesById(userId: string, seriesName: string) {
    return await this.seriesRepository.findSeriesById(userId, seriesName);
  }

  async createSeries(dto: CreateSeriestDto, userId: string) {
    return await this.seriesRepository.createSeries(dto, userId);
  }

  async deleteSeries(seriesId: string, userId: string) {
    const series = await this.getSeriesById(userId, seriesId);
    if (series.userId !== userId)
      throw new AppErrorException(
        'Forbidden',
        "You don't have permission to delete this series",
      );
    return await this.seriesRepository.deleteSeries(seriesId);
  }

  async appendPostToSeries(seriesId: string, postId: string, userId: string) {
    const series = await this.getSeriesById(userId, seriesId);
    if (series.userId !== userId)
      throw new AppErrorException(
        'Forbidden',
        "You don't have permission to append post this series",
      );
    return await this.seriesRepository.appendPostToSeries(
      seriesId,
      postId,
      userId,
    );
  }
}
