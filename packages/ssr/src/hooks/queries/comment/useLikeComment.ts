import CommentAPI from '~/lib/api/comment';
import { useMutation } from '@tanstack/react-query';
import { UseMutationOptionsOf } from '~/hooks/queries/types';

const useLikeComment = (
  options: UseMutationOptionsOf<typeof CommentAPI.likeComment> = {},
) => {
  return useMutation(CommentAPI.likeComment, options);
};

export default useLikeComment;
