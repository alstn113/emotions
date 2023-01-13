import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

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

  async verifyAccessToken(accessToken: string): Promise<User> {
    const ACCESS_TOKEN_SECRET = this.configService.get<string>('access_token.secret');

    const payload = await this.jwtService.verifyAsync(accessToken, {
      secret: ACCESS_TOKEN_SECRET,
    });

    return payload;
  }
}
