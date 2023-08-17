import { useMutation } from '@tanstack/react-query';

import { UseMutationOptionsOf } from '~/hooks/queries/types';

import { CommentAPI } from '~/lib/api';

const useLikeComment = (
  options: UseMutationOptionsOf<typeof CommentAPI.likeComment> = {},
) => {
  return useMutation(CommentAPI.likeComment, options);
};

export default useLikeComment;
