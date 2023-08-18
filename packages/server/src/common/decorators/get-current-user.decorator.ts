// https://dev.to/micalevisk/nestjs-tip-type-safety-on-parameter-decorators-24mn

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { Request } from 'express';

type User = Request['user'];

export const GetCurrentUser = createParamDecorator<
  keyof User | undefined,
  ExecutionContext
>((data, ctx) => {
  const req: Request = ctx.switchToHttp().getRequest();
  if (!req.user) return null;
  if (!data) return req.user;
  return req.user[data];
});

export type CurrentUser<Prop extends keyof User | undefined = undefined> =
  Prop extends undefined ? User : Prop extends keyof User ? User[Prop] : never;
