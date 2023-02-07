import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './types';
import { Response } from 'express';

@Injectable()
export class AuthService {
  domains: string[];
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.domains =
      process.env.NODE_ENV === 'production' ? ['.wap-dev.store'] : [undefined];
  }

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
    // httpOnly: 브라우저에서 접근 금지
    // secure: https에서만 쿠키 전송
    // domain: 쿠키를 전송할 도메인
    this.domains.forEach((domain) => {
      if (process.env.NODE_ENV === 'production') {
        res.cookie('access_token', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 1, // 1d
          secure: true,
          path: '/',
          domain,
        });
      } else {
        res.cookie('access_token', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 1, // 1d
          path: '/',
          domain,
        });
      }
    });
  }

  clearTokenCookie(res: Response) {
    this.domains.forEach((domain) => {
      res.clearCookie('access_token', {
        path: '/',
        domain,
      });
    });
  }

  async verifyToken(token: string) {
    const decoded: TokenPayload = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('ACCESS_TOKEN.SECRET'),
    });

    return decoded;
  }
}
