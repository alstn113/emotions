import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { CreateSeriestDto } from './dto/create-series.dto';

@Injectable()
export class SeriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserSeriesList(userId: string) {
    return await this.prisma.series.findMany({
      where: { userId },
    });
  }

  async findSeriesById(userId: string, seriesName: string) {
    return await this.prisma.series.findUnique({
      where: {
        name_userId: {
          name: seriesName,
          userId,
        },
      },
    });
  }

  async createSeries(dto: CreateSeriestDto, userId: string) {
    return await this.prisma.series.create({
      data: {
        name: dto.name,
        userId,
      },
    });
  }

  async deleteSeries(seriesId: string) {
    return await this.prisma.series.delete({
      where: { id: seriesId },
    });
  }

  async appendPostToSeries(seriesId: string, postId: string, userId: string) {
    return;
  }
}
