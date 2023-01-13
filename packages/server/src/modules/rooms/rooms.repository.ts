import { HttpException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '~/prisma/prisma.service';
import { CreateRoomDto } from './dto';

@Injectable()
export class RoomsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findRoomById(id: string) {
    const room = await this.prisma.room.findUnique({
      where: {
        id,
      },
    });
    if (!room) throw new HttpException('Room not found', 404);

    return room;
  }

  async findRooms() {
    return this.prisma.room.findMany({});
  }

  async createRoom(dto: CreateRoomDto, userId: string) {
    return await this.prisma.room.create({
      data: {
        ...dto,
        ownerId: userId,
      },
    });
  }

  async deleteRoomById(id: string) {
    return await this.prisma.room.delete({
      where: {
        id,
      },
    });
  }
}
