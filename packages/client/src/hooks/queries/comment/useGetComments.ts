import CommentAPI from '~/api/comment';
import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptionsOf } from '~/hooks/queries/types';

const useGetComments = (
  postId: string,
  options: UseQueryOptionsOf<typeof CommentAPI.getComments> = {},
) => {
  return useQuery(getKey(postId), fetcher(postId), options);
};

const getKey = (postId: string) => ['useGetComments', postId];
const fetcher = (postId: string) => () => CommentAPI.getComments(postId);

useGetComments.getKey = getKey;
useGetComments.fetcher = fetcher;

export default useGetComments;
