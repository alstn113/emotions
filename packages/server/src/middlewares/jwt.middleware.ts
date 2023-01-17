import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '~/modules/auth/auth.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    req.user = null;

    const token = req?.cookies?.access_token;

    if (!token) {
      return next();
    }

    try {
      const decoded = await this.authService.verifyToken(token);
      req.user = {
        userId: decoded.userId,
        username: decoded.username,
      };
    } catch (error) {
      this.authService.clearTokenCookie(res);
      console.log(error);
    }

    return next();
  }
}

declare module 'Express' {
  interface Request {
    user: {
      userId: string;
      username: string;
    } | null;
  }
}
