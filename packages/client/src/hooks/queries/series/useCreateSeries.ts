import { useMutation } from '@tanstack/react-query';

import type { UseMutationOptionsOf } from '~/hooks/queries/types';

import { SeriesAPI } from '~/lib/api';

const useCreateSeries = (
  options: UseMutationOptionsOf<typeof SeriesAPI.createSeries> = {},
) => {
  return useMutation(SeriesAPI.createSeries, options);
};

export default useCreateSeries;
