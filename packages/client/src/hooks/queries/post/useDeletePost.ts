import PostAPI from '~/api/post';
import { useMutation } from '@tanstack/react-query';
import type { UseMutationOptionsOf } from '~/hooks/queries/types';

const useDeletePost = (
  options: UseMutationOptionsOf<typeof PostAPI.deletePost> = {},
) => {
  return useMutation(PostAPI.deletePost, options);
};

export default useDeletePost;
