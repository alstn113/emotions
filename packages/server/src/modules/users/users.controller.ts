import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetCurrentUser, Public } from '~/common/decorators';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get('me')
  async getCurrentUser(
    @GetCurrentUser() user: { userId: string; username: string },
  ): Promise<User | null> {
    if (!user) {
      return null;
    }
    return await this.usersService.getUserById(user.userId);
  }
}
