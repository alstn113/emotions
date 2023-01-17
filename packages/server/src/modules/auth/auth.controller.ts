import { Controller, Delete, Get, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { GetCurrentUser, Public } from '~/common/decorators';
import { GithubGuard } from '~/common/guards';
import { AuthService } from './auth.service';

@Public()
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
  async githubCallback(
    @Res() res: Response,
    @GetCurrentUser() user: { userId: string; username: string },
  ) {
    const FRONTEND_URL = this.configService.get<string>('FRONTEND_URL');
    const token = await this.authService.generateToken(user.userId, user.username);
    this.authService.setTokenCookie(res, token);
    return res.redirect(`${FRONTEND_URL}/room`);
  }

  @Delete('/logout')
  logout(@Res() res: Response) {
    this.authService.clearTokenCookie(res);
    return res.status(200).json({ message: 'Logout success' });
  }
}
