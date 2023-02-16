import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { GetCurrentUser, Public } from '~/common/decorators';
import { UserDto } from './dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get('me')
  async getCurrentUser(
    @GetCurrentUser('userId') userId: string,
  ): Promise<UserDto> | null {
    if (!userId) {
      return null;
    }
    const user = await this.usersService.getUserById(userId);
    return plainToInstance(UserDto, user, {
      excludeExtraneousValues: true,
    });
  }
}
