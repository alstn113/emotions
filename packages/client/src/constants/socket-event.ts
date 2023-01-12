export const SOCKET_EVENT = {
  JOIN_ROOM: 'join_room',
  LEAVE_ROOM: 'leave_room',
  JOINED_ROOM: 'joined_room',
  LEFT_ROOM: 'left_room',
  CHAT_MESSAGE: 'chat_message',
  START_TYPING: 'start_typing',
  STOP_TYPING: 'stop_typing',
} as const;

export type SOCKET_EVENT = (typeof SOCKET_EVENT)[keyof typeof SOCKET_EVENT];
