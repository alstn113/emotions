import { useMutation } from '@tanstack/react-query';

import type { UseMutationOptionsOf } from '~/hooks/queries/types';

import { SeriesAPI } from '~/lib/api';

const useEditSeries = (
  options: UseMutationOptionsOf<typeof SeriesAPI.editSeries> = {},
) => {
  return useMutation(SeriesAPI.editSeries, options);
};

export default useEditSeries;
