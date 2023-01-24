// react
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MessagePayload, TypingStatusPayload, User } from '~/types';

// hooks
import { useQueryClient } from '@tanstack/react-query';
import { useGetMe } from '~/hooks/queries/user';
import { useGetRoom } from '~/hooks/queries/room';
import useTyping from '~/hooks/useTyping';

// components
import * as S from './Chat.styles';
import Message from '~/components/Chat/Message';
import DynamicIsland from '~/components/DynamicIsland/DynamicIsland';
import BaseLayout from '~/components/layouts/BaseLayout';

// sockets
import { SOCKET_EVENT } from '~/constants';
import roomSocket, { initRoomSocket, leaveRoom } from '~/sockets/roomSocket';

const Chat = () => {
  const { roomId } = useParams() as { roomId: string };
  const { data: room } = useGetRoom(roomId);

  // get user data
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(useGetMe.getKey());

  const { isTyping, startTyping, stopTyping, cancelTyping } = useTyping();
  const [messages, setMessages] = useState<{ uid: string; username: string; message: string }[]>(
    [],
  );
  const [messageInput, setMessageInput] = useState<string>('');
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sendMessage = ({ message }: { message: string }) => {
    roomSocket.socket?.emit(SOCKET_EVENT.CHAT_MESSAGE, {
      roomId,
      message,
    });
  };

  const receiveMessage = () => {
    roomSocket.socket?.on(
      SOCKET_EVENT.CHAT_MESSAGE,
      ({ uid, username, message }: MessagePayload) => {
        setMessages((prevMessages) => [...prevMessages, { uid, username, message }]);
      },
    );
  };

  const handleSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    cancelTyping();
    sendMessage({ message: messageInput });
    setMessageInput('');
  };

  const handleChangeMessageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);
  };

  const startTypingMessage = () => {
    roomSocket.socket?.emit(SOCKET_EVENT.TYPING_STATUS, { roomId, isTyping: true });
  };

  const stopTypingMessage = () => {
    roomSocket.socket?.emit(SOCKET_EVENT.TYPING_STATUS, { roomId, isTyping: false });
  };

  useEffect(() => {
    initRoomSocket(roomId);
    receiveMessage();
    roomSocket.socket?.on(
      SOCKET_EVENT.JOINED_ROOM,
      ({ uid, username, message }: MessagePayload) => {
        setMessages((prev) => [...prev, { uid, username, message }]);
      },
    );
    roomSocket.socket?.on(SOCKET_EVENT.LEFT_ROOM, ({ uid, username, message }: MessagePayload) => {
      setMessages((prev) => [...prev, { uid, username, message }]);
    });
    roomSocket.socket?.on(
      SOCKET_EVENT.TYPING_STATUS,
      ({ uid, username, isTyping }: TypingStatusPayload) => {
        if (isTyping) {
          setTypingUsers((prev) => [...prev, username]);
        } else {
          setTypingUsers((prev) => prev.filter((username) => username !== username));
        }
      },
    );

    return () => {
      roomSocket.socket?.emit(SOCKET_EVENT.LEAVE_ROOM, {
        roomId,
      });
      leaveRoom();
    };
  }, [roomId]);

  useEffect(() => {
    if (isTyping) startTypingMessage();
    else stopTypingMessage();
  }, [isTyping]);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  return (
    <BaseLayout>
      <S.Container>
        <DynamicIsland isHost={room?.hostId === user?.id} />
        <S.Contents ref={scrollRef}>
          {messages.map((message, index) => {
            return (
              <S.MessageWrapper key={index} isCurrentUser={user?.id === message.uid}>
                <Message>
                  <div>{message.username}</div>
                  <div>{message.message}</div>
                </Message>
              </S.MessageWrapper>
            );
          })}
          {typingUsers.map((typingUser, index) => {
            return <div key={index}>{typingUser} 입력 중...</div>;
          })}
        </S.Contents>
        <form onSubmit={handleSubmitMessage}>
          <S.MessageInput
            placeholder="Write Message..."
            onChange={handleChangeMessageInput}
            onKeyDown={startTyping}
            onKeyUp={stopTyping}
            value={messageInput}
          />
        </form>
      </S.Container>
    </BaseLayout>
  );
};

export default Chat;
