import { SetMetadata } from '@nestjs/common';

import { User } from '@prisma/client';

export const Roles = (...roles: User['role'][]) => SetMetadata('roles', roles);
