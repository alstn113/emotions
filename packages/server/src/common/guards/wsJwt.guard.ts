import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class WsJwtGuard extends AuthGuard('wsJwt') {
  constructor() {
    super();
  }

  // over getRequest() because it's default uses http
  getRequest(ctx: ExecutionContext) {
    return ctx.switchToWs().getClient().handshake;
  }
}
