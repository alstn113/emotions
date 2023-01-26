import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommnetsService } from './commnets.service';
import { CreateCommnetDto } from './dto/create-commnet.dto';
import { UpdateCommnetDto } from './dto/update-commnet.dto';

@Controller('commnets')
export class CommnetsController {
  constructor(private readonly commnetsService: CommnetsService) {}

  @Post()
  create(@Body() createCommnetDto: CreateCommnetDto) {
    return this.commnetsService.create(createCommnetDto);
  }

  @Get()
  findAll() {
    return this.commnetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commnetsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommnetDto: UpdateCommnetDto) {
    return this.commnetsService.update(+id, updateCommnetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commnetsService.remove(+id);
  }
}
