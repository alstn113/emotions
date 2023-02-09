export const SOCKET_EVENT = {
  // room
  JOIN_ROOM: 'join_room',
  LEAVE_ROOM: 'leave_room',
  JOINED_ROOM: 'joined_room',
  LEFT_ROOM: 'left_room',
  // chat
  CHAT_MESSAGE: 'chat_message',
  TYPING_STATUS: 'typing_status',
  // question
  CHOOSE_QUESTION: 'choose_question',
  QUESTION_CHOSEN: 'question_chosen',
  ANSWER_QUESTION: 'answer_question',
  QUESTION_ANSWERED: 'question_answered',
  // voting
  START_VOTING: 'start_voting',
  STOP_VOTING: 'stop_voting',
  VOTE: 'vote',
} as const;

export type SOCKET_EVENT = (typeof SOCKET_EVENT)[keyof typeof SOCKET_EVENT];
