import { useMutation } from '@tanstack/react-query';

import { UseMutationOptionsOf } from '~/hooks/queries/types';

import { CommentAPI } from '~/lib/api';

const useUnlikeComment = (
  options: UseMutationOptionsOf<typeof CommentAPI.unlikeComment> = {},
) => {
  return useMutation(CommentAPI.unlikeComment, options);
};

export default useUnlikeComment;
