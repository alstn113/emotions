import RoomAPI from '~/api/room';
import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptionsOf } from '~/hooks/types';

const useGetRooms = (options: UseQueryOptionsOf<typeof RoomAPI.getRooms> = {}) => {
  return useQuery(getKey(), fetcher(), options);
};

const getKey = () => ['GetRooms'];
const fetcher = () => () => RoomAPI.getRooms();

useGetRooms.getKey = getKey;
useGetRooms.fetcher = fetcher;

export default useGetRooms;
