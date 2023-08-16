import { useMutation } from '@tanstack/react-query';

import type { UseMutationOptionsOf } from '~/hooks/queries/types';

import { PostAPI } from '~/lib/api';

const useDeletePost = (
  options: UseMutationOptionsOf<typeof PostAPI.deletePost> = {},
) => {
  return useMutation(PostAPI.deletePost, options);
};

export default useDeletePost;
