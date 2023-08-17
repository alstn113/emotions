import { useMutation } from '@tanstack/react-query';

import type { UseMutationOptionsOf } from '~/hooks/queries/types';

import { UserAPI } from '~/lib/api';

const useUpdateEmailNotification = (
  options: UseMutationOptionsOf<typeof UserAPI.updateEmailNotification> = {},
) => {
  return useMutation(UserAPI.updateEmailNotification, options);
};

export default useUpdateEmailNotification;
