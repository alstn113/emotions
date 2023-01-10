import {
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
} from '@tanstack/react-query';

export type UseQueryOptionsOf<TAPI extends (...args: any) => any> =
  UseQueryOptions<
    Awaited<ReturnType<TAPI>>,
    Error,
    Awaited<ReturnType<TAPI>>,
    string[]
  >;

export type UseInfiniteQueryOptionsOf<TAPI extends (...args: any) => any> =
  UseInfiniteQueryOptions<
    Awaited<ReturnType<TAPI>>,
    Error,
    Awaited<ReturnType<TAPI>>,
    Awaited<ReturnType<TAPI>>,
    string[]
  >;

export type UseMutationOptionsOf<TAPI extends (...args: any) => any> =
  UseMutationOptions<
    Awaited<ReturnType<TAPI>>,
    Error,
    Parameters<TAPI>[0] extends undefined ? void : Parameters<TAPI>[0]
  >;
