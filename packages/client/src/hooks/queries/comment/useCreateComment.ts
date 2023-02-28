import { CommentAPI } from '~/lib/api';
import { useMutation } from '@tanstack/react-query';
import type { UseMutationOptionsOf } from '~/hooks/queries/types';

const useCreateComment = (
  options: UseMutationOptionsOf<typeof CommentAPI.createComment> = {},
) => {
  return useMutation(CommentAPI.createComment, options);
};

export default useCreateComment;
