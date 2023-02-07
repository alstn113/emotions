import { Injectable } from '@nestjs/common';
import { AppErrorException } from '~/common/exceptions';
import { CreateRoomDto } from '../dto';
import { RoomsRepository } from '../repositories/rooms.repository';

@Injectable()
export class RoomsService {
  constructor(private readonly roomsRepository: RoomsRepository) {}

  async getRoomById(id: string) {
    const room = await this.roomsRepository.findRoomById(id);
    if (!room) throw new AppErrorException('NotFound', 'Room not found');
    return room;
  }

  async getRooms() {
    return await this.roomsRepository.findRooms();
  }

  async createRoom(dto: CreateRoomDto, userId: string) {
    return await this.roomsRepository.createRoom(dto, userId);
  }

  async deleteRoomById(id: string, userId: string) {
    const room = await this.getRoomById(id);
    if (room.userId !== userId)
      throw new AppErrorException('Forbidden', "you are not the room's host");

    return await this.roomsRepository.deleteRoomById(id);
  }
}
