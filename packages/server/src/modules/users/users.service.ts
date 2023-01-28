import { HttpException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async getUserById(userId: string) {
    const user = await this.usersRepository.findUserById(userId);
    if (!user) throw new HttpException('User not found', 404);
    return user;
  }
}
