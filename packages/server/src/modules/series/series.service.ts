import { Injectable } from '@nestjs/common';
import { AppErrorException } from '~/common/exceptions';
import { UpdateSeriesDto } from './dto';
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

  async editSeries(seriesId: string, dto: UpdateSeriesDto, userId: string) {
    // check if series exists
    const series = await this.getSeriesById(userId, seriesId);

    // check if user has permission to edit series
    if (series.userId !== userId) {
      throw new AppErrorException(
        'Forbidden',
        "You don't have permission to edit this series",
      );
    }

    // check if series with this name already exists
    const exists = await this.seriesRepository.findSeriesByUserId(
      userId,
      dto.name,
    );

    if (exists && exists.id !== seriesId) {
      throw new AppErrorException(
        'BadRequest',
        'Series with this name already exists',
      );
    }

    // update series name if needed
    if (series.name !== dto.name) {
      await this.seriesRepository.updateSeriesName(seriesId, dto.name);
      series.name = dto.name;
    }

    // check if series posts order is valid
    const seriesPosts = await this.seriesRepository.findSeriesPostsList(
      seriesId,
    );

    const valid =
      seriesPosts.length === dto.seriesOrder.length &&
      seriesPosts.every((seriesPost) => {
        return dto.seriesOrder.includes(seriesPost.postId);
      });

    if (!valid) {
      throw new AppErrorException('BadRequest', 'Invalid series posts order');
    }

    // find out which posts were updated from series
    type UpdateSeriesPost = {
      id: string;
      index: number;
    };

    const needToUpdate = seriesPosts.reduce<UpdateSeriesPost[]>(
      (acc, seriesPost) => {
        // find index of post in series order array
        const index = dto.seriesOrder.indexOf(seriesPost.postId);
        if (index !== seriesPost.index - 1) {
          acc.push({
            id: seriesPost.id,
            index: index + 1,
          });
        }
        return acc;
      },
      [],
    );

    // update series posts order if needed
    await Promise.all(
      needToUpdate.map((seriesPost) =>
        this.seriesRepository.updateSeriesPostIndex(
          seriesPost.id,
          seriesPost.index,
        ),
      ),
    );

    return series;
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
