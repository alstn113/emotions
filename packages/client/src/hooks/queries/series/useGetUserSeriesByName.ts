import SeriesAPI from '~/lib/api/series';
import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptionsOf } from '~/hooks/queries/types';

const useGetUserSeriesByName = (
  userId: string,
  seriesName: string,
  options: UseQueryOptionsOf<typeof SeriesAPI.getUserSeriesByName> = {},
) => {
  return useQuery(
    getKey(userId, seriesName),
    fetcher(userId, seriesName),
    options,
  );
};

const getKey = (userId: string, seriesName: string) => [
  'useGetUserSeriesByName',
  userId,
  seriesName,
];
const fetcher = (userId: string, seriesName: string) => () =>
  SeriesAPI.getUserSeriesByName(userId, seriesName);

useGetUserSeriesByName.getKey = getKey;
useGetUserSeriesByName.fetcher = fetcher;

export default useGetUserSeriesByName;
