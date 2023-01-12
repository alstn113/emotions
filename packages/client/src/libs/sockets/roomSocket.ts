import { io, Socket } from 'socket.io-client';
import { API, SOCKET_EVENT } from '~/constants';

const roomSocket = {
  socket: null as Socket | null,
};

export const generateRoomSocket = () => {
  roomSocket.socket = io(`${API.ROOM_SOCKET}`, {
    transports: ['websocket', 'polling'],
  });
};

export const initRoomSocket = (roomId: string) => {
  if (roomSocket.socket === null) {
    generateRoomSocket();
  }
  roomSocket.socket?.connect();
  roomSocket.socket?.emit(SOCKET_EVENT.JOIN_ROOM, { roomId });
  roomSocket.socket?.on(SOCKET_EVENT.JOINED_ROOM, (data) => {
    console.log(data.message);
  });
  roomSocket.socket?.on(SOCKET_EVENT.LEFT_ROOM, (data) => {
    console.log(data.message);
  });
};

export const leaveRoom = () => {
  roomSocket.socket?.off(SOCKET_EVENT.JOINED_ROOM);
  roomSocket.socket?.off(SOCKET_EVENT.LEFT_ROOM);
  roomSocket.socket?.disconnect();
  console.log('leaveRoom');
};

export default roomSocket;
