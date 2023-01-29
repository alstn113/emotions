import { Injectable } from '@nestjs/common';
import { PrismaService } from '~/prisma/prisma.service';
import { CreateRoomDto } from '../dto';

@Injectable()
export class RoomsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findRoomById(id: string) {
    return await this.prisma.room.findUnique({
      where: {
        id,
      },
      ...roomSelector,
    });
  }

  async findRooms() {
    return this.prisma.room.findMany({
      ...roomSelector,
    });
  }

  async createRoom(dto: CreateRoomDto, userId: string) {
    return await this.prisma.room.create({
      data: {
        ...dto,
        userId,
      },
      ...roomSelector,
    });
  }

  async deleteRoomById(id: string) {
    return await this.prisma.room.delete({
      where: {
        id,
      },
      ...roomSelector,
    });
  }
}

const roomSelector = {
  include: {
    user: {
      select: {
        id: true,
        username: true,
        displayName: true,
      },
    },
  },
};
