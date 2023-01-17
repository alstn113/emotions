import RoomAPI from '~/api/room';
import { useMutation } from '@tanstack/react-query';
import type { UseMutationOptionsOf } from '~/hooks/types';

const useDeleteRoom = (options: UseMutationOptionsOf<typeof RoomAPI.deleteRoom> = {}) => {
  return useMutation(RoomAPI.deleteRoom, options);
};

export default useDeleteRoom;
