import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { GetCurrentUser, Public } from '~/common/decorators';
import { SeriesDto, SeriesPostDto, UpdateSeriesDto } from './dto';
import { CreateSeriestDto } from './dto/create-series.dto';
import { SeriesService } from './series.service';

@ApiTags('series')
@Controller('series')
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  // Get a specific user's series list.
  @Public()
  @Get('username/:username')
  async getUserSeriesList(
    @Param('username') username: string,
  ): Promise<SeriesDto[]> {
    const seriesList = await this.seriesService.getUserSeriesList(username);
    return plainToInstance(SeriesDto, seriesList);
  }

  // Get a specific series by name.
  @Public()
  @Get(':seriesName/username/:username')
  async getUserSeriesByName(
    @Param('username') username: string,
    @Param('seriesName') seriesName: string,
  ): Promise<SeriesDto> {
    const series = await this.seriesService.getSeriesByName(
      username,
      seriesName,
    );
    return plainToInstance(SeriesDto, series);
  }

  @Post()
  async createSeries(
    @Body() dto: CreateSeriestDto,
    @GetCurrentUser('userId') userId: string,
  ): Promise<SeriesDto> {
    const series = await this.seriesService.createSeries(dto, userId);
    return plainToInstance(SeriesDto, series);
  }

  @Delete(':seriesId')
  async deleteSeries(
    @Param('seriesId') seriesId: string,
    @GetCurrentUser('userId') userId: string,
  ): Promise<SeriesDto> {
    const series = await this.seriesService.deleteSeries(seriesId, userId);
    return plainToInstance(SeriesDto, series);
  }

  @Post(':seriesId/postId/:postId')
  async appendToSeries(
    @Param('seriesId') seriesId: string,
    @Param('postId') postId: string,
    @GetCurrentUser('userId') userId: string,
  ): Promise<SeriesPostDto> {
    const seriesPost = await this.seriesService.appendPostToSeries(
      seriesId,
      postId,
      userId,
    );
    return plainToInstance(SeriesPostDto, seriesPost);
  }

  // patch는 일부만 수정할 때 사용, put은 전체를 수정할 때 사용
  @Patch(':seriesId')
  async editSeries(
    @Param('seriesId') seriesId: string,
    @Body() dto: UpdateSeriesDto,
    @GetCurrentUser('userId') userId: string,
  ): Promise<SeriesDto> {
    const editedSeries = await this.seriesService.editSeries(
      seriesId,
      dto,
      userId,
    );

    return plainToInstance(SeriesDto, editedSeries);
  }
}
