import CommentAPI from '~/api/comment';
import { useMutation } from '@tanstack/react-query';
import { UseMutationOptionsOf } from '~/hooks/queries/types';

const useUnlikeComment = (options: UseMutationOptionsOf<typeof CommentAPI.unlikeComment> = {}) => {
  return useMutation(CommentAPI.unlikeComment, options);
};

export default useUnlikeComment;
