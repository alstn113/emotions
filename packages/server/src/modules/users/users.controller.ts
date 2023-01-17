import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUser } from '~/common/decorators';
import { UsersService } from './users.service';

@ApiTags('/users')
@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  async getCurrentUser(@GetCurrentUser('id') userId: string) {
    return await this.usersService.getUserById(userId);
  }
}
