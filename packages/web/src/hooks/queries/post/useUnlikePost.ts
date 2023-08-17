import { useMutation } from '@tanstack/react-query';

import { UseMutationOptionsOf } from '~/hooks/queries/types';

import { PostAPI } from '~/lib/api';

const useUnlikePost = (
  options: UseMutationOptionsOf<typeof PostAPI.unlikePost> = {},
) => {
  return useMutation(PostAPI.unlikePost, options);
};

export default useUnlikePost;
