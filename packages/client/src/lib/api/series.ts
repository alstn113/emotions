import { API } from '~/constants';
import {
  AppendToPostSeriesParams,
  CreateSeriesParams,
  Series,
  SeriesList,
} from '../types';
import apiClient from './apiClient';

const SeriesAPI = {
  getUserSeries: async (username: string): Promise<SeriesList> => {
    const { data } = await apiClient.get(`${API.SERIES}/user/${username}`);
    return data;
  },
  getUserSeriesByName: async (
    username: string,
    seriesName: string,
  ): Promise<Series> => {
    const { data } = await apiClient.get(
      `${API.SERIES}/user/${username}/name/${seriesName}`,
    );
    return data;
  },
  createSeries: async (params: CreateSeriesParams) => {
    const { data } = await apiClient.post(`${API.SERIES}`, params);
    return data;
  },
  deleteSeries: async (seriesId: string) => {
    const { data } = await apiClient.delete(`${API.SERIES}/${seriesId}`);
    return data;
  },
  appendPostToSeries: async (params: AppendToPostSeriesParams) => {
    const { seriesId, postId } = params;
    const { data } = await apiClient.post(
      `${API.SERIES}/${seriesId}/post/${postId}`,
    );
    return data;
  },
};

export default SeriesAPI;
