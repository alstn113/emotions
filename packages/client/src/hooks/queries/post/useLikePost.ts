import PostAPI from '~/api/post';
import { useMutation } from '@tanstack/react-query';
import { UseMutationOptionsOf } from '~/hooks/queries/types';

const useLikePost = (
  options: UseMutationOptionsOf<typeof PostAPI.likePost> = {},
) => {
  return useMutation(PostAPI.likePost, options);
};

export default useLikePost;
