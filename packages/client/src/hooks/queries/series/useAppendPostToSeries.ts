import SeriesAPI from '~/lib/api/series';
import { useMutation } from '@tanstack/react-query';
import type { UseMutationOptionsOf } from '~/hooks/queries/types';

const useAppendToPostSeries = (
  options: UseMutationOptionsOf<typeof SeriesAPI.appendPostToSeries> = {},
) => {
  return useMutation(SeriesAPI.appendPostToSeries, options);
};

export default useAppendToPostSeries;
