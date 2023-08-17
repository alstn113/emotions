import { useQuery } from '@tanstack/react-query';

import type { UseQueryOptionsOf } from '~/hooks/queries/types';

import { PostAPI } from '~/lib/api';

const useGetPost = (
  postId: string,
  options: UseQueryOptionsOf<typeof PostAPI.getPost> = {},
) => {
  return useQuery(getKey(postId), fetcher(postId), options);
};

const getKey = (postId: string) => ['useGetPost', postId];
const fetcher = (postId: string) => async () => await PostAPI.getPost(postId);

useGetPost.getKey = getKey;
useGetPost.fetcher = fetcher;

export default useGetPost;
