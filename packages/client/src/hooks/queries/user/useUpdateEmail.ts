import { UserAPI } from '~/lib/api';
import { useMutation } from '@tanstack/react-query';
import type { UseMutationOptionsOf } from '~/hooks/queries/types';

const useUpdateEmail = (
  options: UseMutationOptionsOf<typeof UserAPI.updateEmail> = {},
) => {
  return useMutation(UserAPI.updateEmail, options);
};

export default useUpdateEmail;
