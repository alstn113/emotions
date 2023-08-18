import { UseGuards, applyDecorators } from '@nestjs/common';

import { User } from '@prisma/client';

import { Roles } from '../decorators/roles.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';

export const AuthRoles = (...roles: User['role'][]) =>
  applyDecorators(Roles(...roles), UseGuards(AuthGuard, RolesGuard));
