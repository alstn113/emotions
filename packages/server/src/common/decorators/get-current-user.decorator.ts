import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const GetCurrentUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    const req: Request = context.switchToHttp().getRequest();
    if (!req.user) return null;
    if (data) return req.user?.[data];
    return req.user;
  },
);
