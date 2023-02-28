import SeriesAPI from '~/lib/api/series';
import { useMutation } from '@tanstack/react-query';
import type { UseMutationOptionsOf } from '~/hooks/queries/types';

const useEditSeries = (
  options: UseMutationOptionsOf<typeof SeriesAPI.editSeries> = {},
) => {
  return useMutation(SeriesAPI.editSeries, options);
};

export default useEditSeries;
