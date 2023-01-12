export const SOCKET_EVENT = {
  JOIN_ROOM: 'join_room',
  LEAVE_ROOM: 'leave_room',
  JOINED_ROOM: 'joined_room',
  LEFT_ROOM: 'left_room',
  CHAT_MESSAGE: 'chat_message',
} as const;

export type SOCKET_EVENT = (typeof SOCKET_EVENT)[keyof typeof SOCKET_EVENT];
