import { HttpException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async generateAccessToken(user: User): Promise<string> {
    const ACCESS_TOKEN_SECRET = this.configService.get<string>('access_token.secret');
    const ACCESS_TOKEN_DURATION = this.configService.get<string>('access_token.duration');

    const accessToken = await this.jwtService.signAsync(
      {
        userId: user.id,
        email: user.email,
      },
      {
        secret: ACCESS_TOKEN_SECRET,
        expiresIn: ACCESS_TOKEN_DURATION,
      },
    );

    return accessToken;
  }

  async verifyAccessToken(accessToken: string) {
    const ACCESS_TOKEN_SECRET = this.configService.get<string>('access_token.secret');
    try {
      const payload: TokenPayload = await this.jwtService.verifyAsync(accessToken, {
        secret: ACCESS_TOKEN_SECRET,
      });
      return payload;
    } catch (error) {
      throw new HttpException('Invalid access token', 401);
    }
  }

  async verifyToken(token: string) {
    const ACCESS_TOKEN_SECRET = this.configService.get<string>('access_token.secret');
    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: ACCESS_TOKEN_SECRET,
      });
      return decoded;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new HttpException('Token expired', 401);
      }
      throw new HttpException('Invalid token', 401);
    }
  }
}
