import { Injectable } from '@nestjs/common';

import { UpdateEmailDto, UpdateEmailNotificationDto } from './dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserById(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findUserByUsername(username: string) {
    return await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  async updateEmail(id: string, dto: UpdateEmailDto) {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        email: dto.email,
      },
    });
  }

  async updateEmailNotification(id: string, dto: UpdateEmailNotificationDto) {
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        emailNotification: dto.enabled,
      },
    });
  }
}
