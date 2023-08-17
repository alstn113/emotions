import { useQueryClient } from '@tanstack/react-query';

import { User } from '~/lib/types';

import { useGetMe } from './queries/user';

const useUser = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(useGetMe.getKey());
  return user as User;
};

export default useUser;
