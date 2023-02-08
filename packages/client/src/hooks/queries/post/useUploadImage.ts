import PostAPI from '~/lib/api/post';
import { useMutation } from '@tanstack/react-query';
import type { UseMutationOptionsOf } from '~/hooks/queries/types';

const useUploadImage = (
  options: UseMutationOptionsOf<typeof PostAPI.uploadImage> = {},
) => {
  return useMutation(PostAPI.uploadImage, options);
};

export default useUploadImage;
