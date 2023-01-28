import PostAPI from '~/api/post';
import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptionsOf } from '~/hooks/queries/types';

const useGetPostComments = (
  postId: string,
  options: UseQueryOptionsOf<typeof PostAPI.getPostComments> = {},
) => {
  return useQuery(getKey(postId), fetcher(postId), options);
};

const getKey = (postId: string) => ['useGetPostComments', postId];
const fetcher = (postId: string) => () => PostAPI.getPostComments(postId);

useGetPostComments.getKey = getKey;
useGetPostComments.fetcher = fetcher;

export default useGetPostComments;
