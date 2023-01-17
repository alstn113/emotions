import { Injectable } from '@nestjs/common';
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

  async generateToken(userId: string, username: string): Promise<string> {
    const token = await this.jwtService.signAsync(
      {
        userId,
        username,
      },
      {
        secret: this.configService.get<string>('ACCESS_TOKEN.SECRET'),
        expiresIn: this.configService.get<string>('ACCESS_TOKEN.DURATION'),
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
    const decoded: TokenPayload = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('ACCESS_TOKEN.SECRET'),
    });

    return decoded;
  }
}
