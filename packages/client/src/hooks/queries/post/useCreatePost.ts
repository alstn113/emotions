import { useMutation } from '@tanstack/react-query';

import type { UseMutationOptionsOf } from '~/hooks/queries/types';

import { PostAPI } from '~/lib/api';

const useCreatePost = (
  options: UseMutationOptionsOf<typeof PostAPI.createPost> = {},
) => {
  return useMutation(PostAPI.createPost, options);
};

export default useCreatePost;
