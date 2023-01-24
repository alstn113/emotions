// react
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MessagePayload, TypingStatusPayload, User } from '~/types';

// hooks
import { useQueryClient } from '@tanstack/react-query';
import { useGetMe } from '~/hooks/queries/user';
import { useGetRoom } from '~/hooks/queries/room';

// components
import styled from '@emotion/styled';
import ChatInput from './ChatInput';
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
  const isHost = room?.hostId === user?.id;

  const [messages, setMessages] = useState<{ uid: string; username: string; message: string }[]>(
    [],
  );
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const receiveMessage = () => {
    roomSocket.socket?.on(
      SOCKET_EVENT.CHAT_MESSAGE,
      ({ uid, username, message }: MessagePayload) => {
        setMessages((prevMessages) => [...prevMessages, { uid, username, message }]);
      },
    );
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

  //TODO: 스크롤이 바닥에 있을 경우에만 따라가게 하기
  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages]);

  return (
    <BaseLayout>
      <Container ref={scrollRef}>
        <Wrapper>
          <DynamicIsland isHost={isHost} />
          <Contents>
            {messages.map((message, index) => {
              const isMyMessage = user?.id === message.uid;
              return (
                <Message key={index} isMyMessage={isMyMessage} isHost={isHost}>
                  <div>{message.username}</div>
                  <div>{message.message}</div>
                </Message>
              );
            })}
            {typingUsers.map((typingUser, index) => {
              return <div key={index}>{typingUser} 입력 중...</div>;
            })}
          </Contents>
          <ChatInput roomId={roomId} />
        </Wrapper>
      </Container>
    </BaseLayout>
  );
};
export default Chat;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: scroll;
  overflow-x: hidden;
  padding: 16px;
`;

const Wrapper = styled.div`
  max-width: 768px;
  width: 100%;
  margin: 0 auto;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
