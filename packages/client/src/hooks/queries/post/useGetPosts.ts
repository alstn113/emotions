import PostAPI from '~/api/post';
import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptionsOf } from '~/hooks/queries/types';

const useGetPosts = (
  options: UseQueryOptionsOf<typeof PostAPI.getPosts> = {},
) => {
  return useQuery(getKey(), fetcher(), options);
};

const getKey = () => ['useGetPosts'];
const fetcher = () => () => PostAPI.getPosts();

useGetPosts.getKey = getKey;
useGetPosts.fetcher = fetcher;

export default useGetPosts;
