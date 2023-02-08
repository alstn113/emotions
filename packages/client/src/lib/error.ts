import axios from 'axios';

type ErrorName =
  | 'BadRequest'
  | 'Unauthorized'
  | 'Forbidden'
  | 'NotFound'
  | 'Unknown';

export interface AppError {
  statusCode: number;
  message: string;
  name: ErrorName;
}

// error is AppError is a type guard
export const isAppError = (error: any): error is AppError => {
  // optional chaining은 ?. 앞이 null이나 undefine일 경우 undefined 반환.
  return (
    error?.statusCode !== undefined &&
    error?.message !== undefined &&
    error?.name !== undefined
  );
};

export const extractError = (error: any): AppError => {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    if (isAppError(data)) {
      return data;
    }
  }

  return {
    statusCode: 500,
    message: 'Unknown error',
    name: 'Unknown',
  };
};
