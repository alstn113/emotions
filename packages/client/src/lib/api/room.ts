import { API } from '~/constants';
import { CreateRoomParams, Room } from '~/lib/types';
import apiClient from './apiClient';

const RoomAPI = {
  getRooms: async (): Promise<Room[]> => {
    const { data } = await apiClient.get(`${API.ROOM}`);
    return data;
  },

  getRoom: async (id: string): Promise<Room> => {
    const { data } = await apiClient.get(`${API.ROOM}/${id}`);
    return data;
  },

  createRoom: async (params: CreateRoomParams): Promise<Room> => {
    const { data } = await apiClient.post(`${API.ROOM}`, params);
    return data;
  },

  deleteRoom: async (id: string): Promise<Room> => {
    const { data } = await apiClient.delete(`${API.ROOM}/${id}`);
    return data;
  },
};

export default RoomAPI;
