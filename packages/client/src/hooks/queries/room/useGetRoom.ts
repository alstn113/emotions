import RoomAPI from '~/libs/api/room';
import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptionsOf } from '~/hooks/types';

const useGetRoom = (roomId: string, options: UseQueryOptionsOf<typeof RoomAPI.getRoom> = {}) => {
  return useQuery(getKey(roomId), fetcher(roomId), options);
};

const getKey = (roomId: string) => ['GetRoom', roomId];
const fetcher = (roomId: string) => async () => await RoomAPI.getRoom(roomId);

useGetRoom.getKey = getKey;
useGetRoom.fetcher = fetcher;

export default useGetRoom;
