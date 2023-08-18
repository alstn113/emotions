import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { User } from '@prisma/client';

import { TokenPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateToken(
    userId: string,
    username: string,
    role: User['role'],
  ): Promise<string> {
    const token = await this.jwtService.signAsync(
      {
        userId,
        username,
        role,
      },
      {
        secret: this.configService.get<string>('ACCESS_TOKEN.SECRET'),
        expiresIn: this.configService.get<string>('ACCESS_TOKEN.DURATION'),
      },
    );

    return token;
  }

  async verifyToken(token: string) {
    const decoded: TokenPayload = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('ACCESS_TOKEN.SECRET'),
    });

    return decoded;
  }
}
