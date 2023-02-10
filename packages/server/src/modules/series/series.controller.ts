import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUser, Public } from '~/common/decorators';
import { CreateSeriestDto } from './dto/create-series.dto';
import { SeriesService } from './series.service';

@ApiTags('series')
@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  // Get a specific user's series list.
  @Public()
  @Get('user/:userId')
  async getUserSeriesList(@Param('userId') userId: string) {
    return await this.seriesService.getUserSeriesList(userId);
  }

  // Get a specific series by name.
  @Public()
  @Get('user/:userId/name/:seriesName')
  async getUserSeriesByName(
    @Param('userId') userId: string,
    @Param('seriesName') seriesName: string,
  ) {
    return await this.seriesService.getSeriesByName(userId, seriesName);
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

  //TODO: add edit series controller
}
