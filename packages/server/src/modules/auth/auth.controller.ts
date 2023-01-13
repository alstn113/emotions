import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Response } from 'express';
import { GetCurrentUser } from '~/common/decorators';
import { GithubGuard } from '~/common/guards';
import { AuthService } from './auth.service';

@ApiTags('/auth')
@Controller('/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('/github')
  @UseGuards(GithubGuard)
  loginWithGithub() {
    return 'login with github';
  }

  @Get('/github/callback')
  @UseGuards(GithubGuard)
  async githubCallback(@Res() res: Response, @GetCurrentUser() user: User) {
    const CLIENT_URL = this.configService.get<string>('client');
    const accessToken = await this.authService.generateAccessToken(user);
    return res.redirect(`${CLIENT_URL}/auth?access_token=${accessToken}`);
  }
}
