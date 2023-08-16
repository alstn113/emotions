import { useMutation } from '@tanstack/react-query';

import type { UseMutationOptionsOf } from '~/hooks/queries/types';

import { SeriesAPI } from '~/lib/api';

const useDeleteSeries = (
  options: UseMutationOptionsOf<typeof SeriesAPI.deleteSeries> = {},
) => {
  return useMutation(SeriesAPI.deleteSeries, options);
};

export default useDeleteSeries;
