import PostAPI from '~/api/post';
import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptionsOf } from '~/hooks/queries/types';

const useGetPosts = (
  options: UseQueryOptionsOf<typeof PostAPI.getPosts> = {},
  cursor?: string,
) => {
  return useQuery(getKey(cursor), fetcher(cursor), options);
};

const getKey = (cursor?: string) => ['useGetPosts', cursor ? cursor : ''];
const fetcher = (cursor?: string) => () => PostAPI.getPosts(cursor);

useGetPosts.getKey = getKey;
useGetPosts.fetcher = fetcher;

export default useGetPosts;
