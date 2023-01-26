import { useQueryClient } from '@tanstack/react-query';
import { User } from '~/types';
import { useGetMe } from './queries/user';

const useUser = () => {
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(useGetMe.getKey());
  return user;
};

export default useUser;
