import { Prisma } from '@prisma/client';

const PrismaClientKnownRequestError = (error) => {
  return error instanceof Prisma.PrismaClientKnownRequestError;
};

/** This is used to update and delete item  */
export const isNotFoundError = (error) => {
  return PrismaClientKnownRequestError(error) && error.code === 'P2025';
};

export const isAlreadyExistsError = (error) => {
  return PrismaClientKnownRequestError(error) && error.code === 'P2002';
};
