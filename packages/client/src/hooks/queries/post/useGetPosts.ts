import PostAPI from '~/lib/api/post';
import { useInfiniteQuery } from '@tanstack/react-query';
import type { UseInfiniteQueryOptionsOf } from '~/hooks/queries/types';

const useGetPosts = (
  options: UseInfiniteQueryOptionsOf<typeof PostAPI.getPosts> = {},
) => {
  return useInfiniteQuery(getKey(), fetcher(), {
    getNextPageParam: ({ pageInfo }) => pageInfo.endCursor,
    suspense: false,
    ...options,
  });
};

const getKey = () => ['useGetPosts'];
const fetcher =
  () =>
  async ({ pageParam }: any) =>
    await PostAPI.getPosts(pageParam);

useGetPosts.getKey = getKey;
useGetPosts.fetcher = fetcher;

export default useGetPosts;
