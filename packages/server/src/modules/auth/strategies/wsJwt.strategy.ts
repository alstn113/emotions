import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokenPayload } from '../types';

@Injectable()
export class WsJwtStrategy extends PassportStrategy(Strategy, 'wsJwt') {
  constructor(
    private readonly prismaService: PrismaService,
    readonly configService: ConfigService,
  ) {
    const ACCESS_TOKEN_SECRET = configService.get<string>('access_token.secret');
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('access_token'),
      secretOrKey: ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: TokenPayload) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id: payload.userId,
      },
    });

    if (!user) return null;

    return user;
  }
}
