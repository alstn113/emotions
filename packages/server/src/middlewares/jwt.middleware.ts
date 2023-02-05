import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '~/modules/auth/auth.service';
import { PrismaService } from '~/prisma/prisma.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    req.user = null;

    const token = req?.cookies?.access_token;

    if (!token) {
      return next();
    }

    try {
      const decoded = await this.authService.verifyToken(token);

      const user = await this.prisma.user.findUnique({
        where: {
          id: decoded.userId,
        },
      });
      if (!user) throw new HttpException('User is not Found', 400);

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

// declare module 'Express' {
//   interface Request {
//     user: {
//       userId: string;
//       username: string;
//     } | null;
//   }
// }
