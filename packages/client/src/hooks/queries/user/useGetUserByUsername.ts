import UserAPI from '~/lib/api/user';
import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptionsOf } from '~/hooks/queries/types';

const useGetUserByUsername = (
  username: string,
  options: UseQueryOptionsOf<typeof UserAPI.getUserByUsername> = {},
) => {
  return useQuery(getKey(username), fetcher(username), options);
};

const getKey = (username: string) => ['useGetUserByUsername', username];
const fetcher = (username: string) => () => UserAPI.getUserByUsername(username);

useGetUserByUsername.getKey = getKey;
useGetUserByUsername.fetcher = fetcher;

export default useGetUserByUsername;
