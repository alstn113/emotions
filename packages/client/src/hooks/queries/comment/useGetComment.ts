import CommentAPI from '~/api/comment';
import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptionsOf } from '~/hooks/queries/types';

const useGetComment = (
  commentId: string,
  options: UseQueryOptionsOf<typeof CommentAPI.getComment> = {},
) => {
  return useQuery(getKey(commentId), fetcher(commentId), options);
};

const getKey = (commentId: string) => ['useGetComment', commentId];
const fetcher = (commentId: string) => async () => await CommentAPI.getComment(commentId);

useGetComment.getKey = getKey;
useGetComment.fetcher = fetcher;

export default useGetComment;
