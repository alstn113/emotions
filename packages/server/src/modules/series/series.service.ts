import { Injectable } from '@nestjs/common';
import { AppErrorException } from '~/common/exceptions';
import { CreateSeriestDto } from './dto/create-series.dto';
import { SeriesRepository } from './series.repository';

@Injectable()
export class SeriesService {
  constructor(private readonly seriesRepository: SeriesRepository) {}

  async getUserSeriesList(username: string) {
    return await this.seriesRepository.findUserSeriesList(username);
  }

  async getSeriesByName(username: string, seriesName: string) {
    const series = await this.seriesRepository.findSeriesByName(
      username,
      seriesName,
    );
    if (!series) throw new AppErrorException('NotFound', 'Series is not found');
    return series;
  }

  async getSeriesById(userId: string, seriesId: string) {
    const series = await this.seriesRepository.findSeriesById(userId, seriesId);
    if (!series) throw new AppErrorException('NotFound', 'Series is not found');
    return series;
  }

  async getSeriesByPostId(postId: string) {
    const series = await this.seriesRepository.findSeriesByPostId(postId);
    return series;
  }

  //TODO: series url slug
  async createSeries(dto: CreateSeriestDto, userId: string) {
    const exists = await this.seriesRepository.findSeriesByUserId(
      userId,
      dto.name,
    );

    if (exists) {
      throw new AppErrorException(
        'BadRequest',
        'Series with this name already exists',
      );
    }
    return await this.seriesRepository.createSeries(dto, userId);
  }

  async appendPostToSeries(seriesId: string, postId: string, userId: string) {
    const series = await this.getSeriesById(userId, seriesId);
    if (series.userId !== userId)
      throw new AppErrorException(
        'Forbidden',
        "You don't have permission to append post this series",
      );

    // check if post is already included in series
    const seriesPostsList = await this.seriesRepository.findSeriesPostsList(
      seriesId,
    );

    const postExists = seriesPostsList.find(
      (seriesPost) => seriesPost.postId === postId,
    );

    if (postExists) {
      throw new AppErrorException(
        'BadRequest',
        'Post is already in this series',
      );
    }

    const nextIndex =
      seriesPostsList.length === 0
        ? 1
        : seriesPostsList[seriesPostsList.length - 1].index + 1;

    const seriesPost = await this.seriesRepository.createSeriesPost(
      series.id,
      postId,
      nextIndex,
    );

    await this.seriesRepository.updateSeriesCount(seriesId);

    return seriesPost;
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
}
