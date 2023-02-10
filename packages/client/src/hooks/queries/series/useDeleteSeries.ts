import SeriesAPI from '~/lib/api/series';
import { useMutation } from '@tanstack/react-query';
import type { UseMutationOptionsOf } from '~/hooks/queries/types';

const useDeleteSeries = (
  options: UseMutationOptionsOf<typeof SeriesAPI.deleteSeries> = {},
) => {
  return useMutation(SeriesAPI.deleteSeries, options);
};

export default useDeleteSeries;
