import { User } from '@prisma/client';

export type TokenPayload = {
  userId: string;
  username: string;
  role: User['role'];
};
