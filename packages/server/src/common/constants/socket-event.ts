export const SOCKET_EVENT = {} as const;

export type SOCKET_EVENT = (typeof SOCKET_EVENT)[keyof typeof SOCKET_EVENT];
