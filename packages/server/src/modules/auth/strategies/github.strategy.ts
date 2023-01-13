import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { PrismaService } from '~/prisma/prisma.service';
import { GithubProfileType } from '../types';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(readonly configService: ConfigService, private readonly prisma: PrismaService) {
    const GITHUB_CLIENT_ID = configService.get<string>('github.client_id');
    const GITHUB_CLIENT_SECRET = configService.get<string>('github.client_secret');
    const GITHUB_CALLBACK_URL = configService.get<string>('github.callback_url');

    super({
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: GITHUB_CALLBACK_URL,
      scope: ['user:email'],
    });
  }

  async validate(_accessToken: string, _refreshToken: string, profile: any, done: any) {
    const { email, login, name }: GithubProfileType = profile._json;
    try {
      const exUser = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
      if (exUser) return done(null, exUser);

      const newUser = await this.prisma.user.create({
        data: {
          email,
          username: login,
          displayName: name,
        },
      });

      return done(null, newUser);
    } catch (error) {
      return done(error, false);
    }
  }
}
