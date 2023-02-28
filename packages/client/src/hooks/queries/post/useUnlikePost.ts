import { PostAPI } from '~/lib/api';
import { useMutation } from '@tanstack/react-query';
import { UseMutationOptionsOf } from '~/hooks/queries/types';

const useUnlikePost = (
  options: UseMutationOptionsOf<typeof PostAPI.unlikePost> = {},
) => {
  return useMutation(PostAPI.unlikePost, options);
};

export default useUnlikePost;
