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
  @Get('user/:username')
  async getUserSeriesList(@Param('username') username: string) {
    return await this.seriesService.getUserSeriesList(username);
  }

  // Get a specific series by name.
  @Public()
  @Get('user/:username/name/:seriesName')
  async getUserSeriesByName(
    @Param('username') username: string,
    @Param('seriesName') seriesName: string,
  ) {
    return await this.seriesService.getSeriesByName(username, seriesName);
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
