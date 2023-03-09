import { Injectable } from '@nestjs/common';
import { AppErrorException } from '~/common/exceptions';
import { UpdateEmailDto, UpdateEmailNotificationDto } from './dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async getUserById(userId: string) {
    const user = await this.usersRepository.findUserById(userId);
    if (!user) throw new AppErrorException('NotFound', 'User not found');
    return user;
  }

  async getUserByUsername(username: string) {
    const user = await this.usersRepository.findUserByUsername(username);
    if (!user) throw new AppErrorException('NotFound', 'User not found');
    return user;
  }

  async updateEmail(userId: string, dto: UpdateEmailDto) {
    try {
      await this.usersRepository.updateEmail(userId, dto);
    } catch (e) {
      if (e.code === 'P2002') {
        throw new AppErrorException('BadRequest', 'Email already exists');
      }
    }
  }

  async updateEmailNotification(
    userId: string,
    dto: UpdateEmailNotificationDto,
  ) {
    await this.usersRepository.updateEmailNotification(userId, dto);
  }
}
