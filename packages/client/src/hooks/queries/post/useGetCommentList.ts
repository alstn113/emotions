import { PostAPI } from '~/lib/api';
import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptionsOf } from '~/hooks/queries/types';

const useGetCommentList = (
  postId: string,
  options: UseQueryOptionsOf<typeof PostAPI.getCommentList> = {},
) => {
  return useQuery(getKey(postId), fetcher(postId), options);
};

const getKey = (postId: string) => ['useGetCommentList', postId];
const fetcher = (postId: string) => () => PostAPI.getCommentList(postId);

useGetCommentList.getKey = getKey;
useGetCommentList.fetcher = fetcher;

export default useGetCommentList;
