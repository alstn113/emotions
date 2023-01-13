import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUser } from '~/common/decorators';
import { JwtGuard } from '~/common/guards';
import { CreateRoomDto } from './dto';
import { RoomsService } from './rooms.service';

@ApiTags('/rooms')
@Controller('/rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get('/:id')
  async getRoomById(@Param('id') id: string) {
    return await this.roomsService.getRoomById(id);
  }

  @Get('/')
  async getRooms() {
    return await this.roomsService.getRooms();
  }

  @Post('/')
  @UseGuards(JwtGuard)
  async createRoom(@Body() dto: CreateRoomDto, @GetCurrentUser('id') userId: string) {
    return this.roomsService.createRoom(dto, userId);
  }

  @Delete('/:id')
  async deleteRoom(@Param('id') id: string) {
    return this.roomsService.deleteRoomById(id);
  }
}
