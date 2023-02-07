import { Injectable } from '@nestjs/common';
import { AppErrorException } from '~/common/exceptions';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async getUserById(userId: string) {
    const user = await this.usersRepository.findUserById(userId);
    if (!user) throw new AppErrorException('NotFound', 'User not found');
    return user;
  }
}
