import { useInfiniteQuery } from '@tanstack/react-query';

import type { UseInfiniteQueryOptionsOf } from '~/hooks/queries/types';

import { PostAPI } from '~/lib/api';

const useGetPostsByUsername = (
  username: string,
  options: UseInfiniteQueryOptionsOf<typeof PostAPI.getPosts> = {},
) => {
  return useInfiniteQuery(getKey(username), fetcher(username), {
    getNextPageParam: ({ pageInfo }) => pageInfo.endCursor,
    suspense: false,
    ...options,
  });
};

const getKey = (username: string) => ['useGetPostsByUsername', username];
const fetcher =
  (username: string) =>
  async ({ pageParam }: any) =>
    await PostAPI.getPostsByUsername(username, pageParam);

useGetPostsByUsername.getKey = getKey;
useGetPostsByUsername.fetcher = fetcher;

export default useGetPostsByUsername;
