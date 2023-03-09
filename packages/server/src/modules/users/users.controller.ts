import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { GetCurrentUser, Public } from '~/common/decorators';
import { UpdateEmailDto, UpdateEmailNotificationDto, UserDto } from './dto';
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

  @Public()
  @Get(':username')
  async getUserByUsername(
    @Param('username') username: string,
  ): Promise<UserDto> {
    const user = await this.usersService.getUserByUsername(username);
    return plainToInstance(UserDto, user, {
      excludeExtraneousValues: true,
    });
  }

  @Patch('email')
  async updateEmail(
    @GetCurrentUser('userId') userId: string,
    @Body() dto: UpdateEmailDto,
  ): Promise<void> {
    await this.usersService.updateEmail(userId, dto);
  }

  @Patch('email-notification')
  async updateEmailNotification(
    @GetCurrentUser('userId') userId: string,
    @Body() dto: UpdateEmailNotificationDto,
  ): Promise<void> {
    await this.usersService.updateEmailNotification(userId, dto);
  }
}
