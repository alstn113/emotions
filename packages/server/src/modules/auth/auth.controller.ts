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
  async githubCallback(@Res() res: Response, @GetCurrentUser() user) {
    const CLIENT_URL = this.configService.get<string>('client');
    const token = await this.authService.generateToken(user.id, user.email);
    this.authService.setTokenCookie(res, token);
    return res.redirect(CLIENT_URL);
  }

  @Delete('/logout')
  logout(@Res() res: Response) {
    this.authService.clearTokenCookie(res);
    return res.status(200).json({ message: 'Logout success' });
  }
}
