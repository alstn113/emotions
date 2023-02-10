import SeriesAPI from '~/lib/api/series';
import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptionsOf } from '~/hooks/queries/types';

const useGetUserSeries = (
  userId: string,
  options: UseQueryOptionsOf<typeof SeriesAPI.getUserSeries> = {},
) => {
  return useQuery(getKey(userId), fetcher(userId), options);
};

const getKey = (userId: string) => ['useGetUserSeries', userId];
const fetcher = (userId: string) => () => SeriesAPI.getUserSeries(userId);

useGetUserSeries.getKey = getKey;
useGetUserSeries.fetcher = fetcher;

export default useGetUserSeries;
