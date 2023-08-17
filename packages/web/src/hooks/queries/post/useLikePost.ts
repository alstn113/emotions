import { useMutation } from '@tanstack/react-query';

import { UseMutationOptionsOf } from '~/hooks/queries/types';

import { PostAPI } from '~/lib/api';

const useLikePost = (
  options: UseMutationOptionsOf<typeof PostAPI.likePost> = {},
) => {
  return useMutation(PostAPI.likePost, options);
};

export default useLikePost;
