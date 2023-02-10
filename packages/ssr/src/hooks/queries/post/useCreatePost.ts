import PostAPI from '~/lib/api/post';
import { useMutation } from '@tanstack/react-query';
import type { UseMutationOptionsOf } from '~/hooks/queries/types';

const useCreatePost = (
  options: UseMutationOptionsOf<typeof PostAPI.createPost> = {},
) => {
  return useMutation(PostAPI.createPost, options);
};

export default useCreatePost;
