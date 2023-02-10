import SeriesAPI from '~/lib/api/series';
import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptionsOf } from '~/hooks/queries/types';

const useGetUserSeries = (
  username: string,
  options: UseQueryOptionsOf<typeof SeriesAPI.getUserSeries> = {},
) => {
  return useQuery(getKey(username), fetcher(username), options);
};

const getKey = (username: string) => ['useGetUserSeries', username];
const fetcher = (username: string) => () => SeriesAPI.getUserSeries(username);

useGetUserSeries.getKey = getKey;
useGetUserSeries.fetcher = fetcher;

export default useGetUserSeries;
