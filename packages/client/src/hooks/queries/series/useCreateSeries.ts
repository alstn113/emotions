import { SeriesAPI } from '~/lib/api';
import { useMutation } from '@tanstack/react-query';
import type { UseMutationOptionsOf } from '~/hooks/queries/types';

const useCreateSeries = (
  options: UseMutationOptionsOf<typeof SeriesAPI.createSeries> = {},
) => {
  return useMutation(SeriesAPI.createSeries, options);
};

export default useCreateSeries;
