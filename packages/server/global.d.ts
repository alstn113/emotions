import type { User as UserModel } from '@prisma/client';

export declare global {
  namespace Express {
    interface Request {
      user: {
        userId: string;
        username: string;
        role: UserModel['role'];
      } | null;
    }
  }
}
