import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { PrismaService } from '~/prisma/prisma.service';
import { GithubProfileType } from '../types';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    const GITHUB_CLIENT_ID = configService.get<string>('GITHUB.CLIENT_ID');
    const GITHUB_CLIENT_SECRET = configService.get<string>(
      'GITHUB.CLIENT_SECRET',
    );
    const GITHUB_CALLBACK_URL = configService.get<string>(
      'GITHUB.CALLBACK_URL',
    );

    super({
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: GITHUB_CALLBACK_URL,
      scope: ['user:email'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: any,
  ) {
    const { login, name, avatar_url }: GithubProfileType = profile._json;
    try {
      const exUser = await this.prisma.user.findUnique({
        where: {
          username: login,
        },
      });
      if (exUser)
        return done(null, {
          userId: exUser.id,
          username: exUser.username,
        });

      const newUser = await this.prisma.user.create({
        data: {
          username: login,
          displayName: name ?? login,
          //TODO: image를 arraybuffer나 stream으로 받아서 저장해보기
          profileImage: avatar_url,
        },
      });

      return done(null, {
        userId: newUser.id,
        username: newUser.username,
      });
    } catch (error) {
      return done(error, false);
    }
  }
}
