import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './types';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateToken(id: string, email: string): Promise<string> {
    const ACCESS_TOKEN_SECRET = this.configService.get<string>('access_token.secret');
    const ACCESS_TOKEN_DURATION = this.configService.get<string>('access_token.duration');

    const token = await this.jwtService.signAsync(
      {
        id,
        email,
      },
      {
        secret: ACCESS_TOKEN_SECRET,
        expiresIn: ACCESS_TOKEN_DURATION,
      },
    );

    return token;
  }

  setTokenCookie(res: Response, token: string) {
    res.cookie('access_token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 1, // 1d
    });
  }

  clearTokenCookie(res: Response) {
    res.clearCookie('access_token');
  }

  async verifyToken(token: string) {
    const ACCESS_TOKEN_SECRET = this.configService.get<string>('access_token.secret');

    const decoded: TokenPayload = await this.jwtService.verifyAsync(token, {
      secret: ACCESS_TOKEN_SECRET,
    });

    return decoded;
  }
}
