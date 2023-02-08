import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { AuthService } from '~/modules/auth/auth.service';
import { PrismaService } from '~/prisma/prisma.service';
import { parseCookie } from '~/lib/cookies';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}
  public async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    req.user = null;

    const client: Socket = context.switchToWs().getClient();
    const token = parseCookie(client.handshake.headers.cookie, 'access_token');
    if (!token) return false;

    const decoded = await this.authService.verifyToken(token);

    const user = await this.prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });

    if (!user) return false;

    req.user = {
      userId: decoded.userId,
      username: decoded.username,
    };

    return true;
  }
}
