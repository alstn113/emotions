import { SeriesAPI } from '~/lib/api';
import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptionsOf } from '~/hooks/queries/types';

const useGetUserSeriesByName = (
  username: string,
  seriesName: string,
  options: UseQueryOptionsOf<typeof SeriesAPI.getUserSeriesByName> = {},
) => {
  return useQuery(
    getKey(username, seriesName),
    fetcher(username, seriesName),
    options,
  );
};

const getKey = (username: string, seriesName: string) => [
  'useGetUserSeriesByName',
  username,
  seriesName,
];
const fetcher = (username: string, seriesName: string) => () =>
  SeriesAPI.getUserSeriesByName(username, seriesName);

useGetUserSeriesByName.getKey = getKey;
useGetUserSeriesByName.fetcher = fetcher;

export default useGetUserSeriesByName;
