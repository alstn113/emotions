import { useMutation } from '@tanstack/react-query';

import type { UseMutationOptionsOf } from '~/hooks/queries/types';

import { CommentAPI } from '~/lib/api';

const useDeleteComment = (
  options: UseMutationOptionsOf<typeof CommentAPI.deleteComment> = {},
) => {
  return useMutation(CommentAPI.deleteComment, options);
};

export default useDeleteComment;
