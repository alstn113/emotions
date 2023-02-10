import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { GetCurrentUser, Public } from '~/common/decorators';
import { CreateSeriestDto } from './dto/create-series.dto';
import { SeriesService } from './series.service';

@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @Public()
  @Get(':seriesId')
  async getSeriesById(@Param('seriesId') seriesId: string) {
    return await this.seriesService.getSeriesById(seriesId);
  }

  // Get a specific user's series.
  @Get('user')
  async getUserSeries(@GetCurrentUser('userId') userId: string) {
    return await this.seriesService.getUserSeries(userId);
  }

  @Post()
  async createSeries(
    @Body() dto: CreateSeriestDto,
    @GetCurrentUser('userId') userId: string,
  ) {
    return await this.seriesService.createSeries(dto, userId);
  }

  @Delete(':seriesId')
  async deleteSeries(
    @Param('seriesId') seriesId: string,
    @GetCurrentUser('userId') userId: string,
  ) {
    return await this.seriesService.deleteSeries(seriesId, userId);
  }

  @Post(':seriesId/post/:postId')
  async appendPostToSeries(
    @Param('seriesId') seriesId: string,
    @Param('postId') postId: string,
    @GetCurrentUser('userId') userId: string,
  ) {
    return await this.seriesService.appendPostToSeries(
      seriesId,
      postId,
      userId,
    );
  }

  //TODO: edit series controller
}
