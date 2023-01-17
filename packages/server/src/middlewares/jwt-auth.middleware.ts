import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request, NextFunction } from 'express';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async use(req: Request, next: NextFunction) {
    req.user = null;

    const token = req?.cookies?.access_token;

    if (!token) {
      return next();
    }

    try {
      const decoded = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('access_token.secret'),
      });
      req.user = {
        id: decoded.id,
        email: decoded.email,
      };
    } catch (error) {
      console.log(error);
    }

    return next();
  }
}

declare module 'Express' {
  interface Request {
    user: {
      id: string;
      email: string;
    } | null;
  }
}
