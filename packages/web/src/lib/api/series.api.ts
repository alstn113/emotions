import { API_URL } from '~/constants';

import apiClient from './apiClient';
import {
  AppendToPostSeriesParams,
  CreateSeriesParams,
  EditSeriesParams,
  Series,
  SeriesList,
} from '../types';

export const SeriesAPI = {
  getUserSeries: async (username: string): Promise<SeriesList> => {
    const { data } = await apiClient.get(
      API_URL.SERIES.GET_USER_SERIES(username),
    );
    return data;
  },
  getUserSeriesByName: async (
    username: string,
    seriesName: string,
  ): Promise<Series> => {
    const { data } = await apiClient.get(
      API_URL.SERIES.GET_USER_SERIES_BY_NAME(username, seriesName),
    );
    return data;
  },
  createSeries: async (params: CreateSeriesParams) => {
    const { data } = await apiClient.post(API_URL.SERIES.CREATE_SERIES, params);
    return data;
  },
  deleteSeries: async (seriesId: string) => {
    const { data } = await apiClient.delete(
      API_URL.SERIES.DELETE_SERIES(seriesId),
    );
    return data;
  },
  appendPostToSeries: async ({
    seriesId,
    postId,
  }: AppendToPostSeriesParams) => {
    const { data } = await apiClient.post(
      API_URL.SERIES.APPEND_POST_TO_SERIES(seriesId, postId),
    );
    return data;
  },
  editSeries: async ({ seriesId, name, seriesOrder }: EditSeriesParams) => {
    const { data } = await apiClient.patch(
      API_URL.SERIES.EDIT_SERIES(seriesId),
      {
        name,
        seriesOrder,
      },
    );
    return data;
  },
};
