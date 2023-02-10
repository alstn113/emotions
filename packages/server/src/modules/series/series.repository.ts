import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { CreateSeriestDto } from './dto/create-series.dto';

@Injectable()
export class SeriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findSeriesById(seriesId: string) {
    return;
  }

  async findUserSeries(userId: string) {
    return;
  }

  async createSeries(dto: CreateSeriestDto, userId: string) {
    return;
  }

  async deleteSeries(seriesId: string, userId: string) {
    return;
  }

  async appendPostToSeries(seriesId: string, postId: string, userId: string) {
    return;
  }
}
