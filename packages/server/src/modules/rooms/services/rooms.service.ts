import { HttpException, Injectable } from '@nestjs/common';
import { CreateRoomDto } from '../dto';
import { RoomsRepository } from '../repositories/rooms.repository';

@Injectable()
export class RoomsService {
  constructor(private readonly roomsRepository: RoomsRepository) {}

  async getRoomById(id: string) {
    const room = await this.roomsRepository.findRoomById(id);
    if (!room) throw new HttpException('Room not found', 404);
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
    if (room.userId !== userId) throw new HttpException('You are not the host of this room', 403);

    return await this.roomsRepository.deleteRoomById(id);
  }
}
