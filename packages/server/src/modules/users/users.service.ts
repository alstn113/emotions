import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async getCurrentUser(userId: string) {
    return await this.usersRepository.findUserById(userId);
  }
}
