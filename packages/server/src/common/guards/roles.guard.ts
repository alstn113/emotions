import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    if (requiredRoles.length === 0) return true;

    const request: Request = context.switchToHttp().getRequest();
    const user = request.user; // Assuming the user is attached to the request

    if (!user) return false; // No user, deny access

    return requiredRoles.includes(user.role);
  }
}
