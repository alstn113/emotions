import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';

export const GetCurrentUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const req: Request = context.switchToHttp().getRequest();
    if (data) return req.user[data];
    return req.user;
  },
);

declare module 'Express' {
  interface Request {
    user: User;
  }
}
