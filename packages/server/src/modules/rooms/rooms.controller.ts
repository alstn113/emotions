import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUser, Public } from '~/common/decorators';
import { CreateRoomDto } from './dto';
import { RoomsService } from './services/rooms.service';

@ApiTags('/rooms')
@Controller('/rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Public()
  @Get('/:id')
  async getRoomById(@Param('id') id: string) {
    return await this.roomsService.getRoomById(id);
  }

  @Public()
  @Get('/')
  async getRooms() {
    return await this.roomsService.getRooms();
  }

  @Post('/')
  async createRoom(@Body() dto: CreateRoomDto, @GetCurrentUser('userId') userId: string) {
    return this.roomsService.createRoom(dto, userId);
  }

  @Delete('/:id')
  async deleteRoom(@Param('id') id: string, @GetCurrentUser('userId') userId: string) {
    return this.roomsService.deleteRoomById(id, userId);
  }
}
