// react
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MessagePayload, TypingStatusPayload } from '~/lib/types';

// hooks
import { useGetRoom } from '~/hooks/queries/room';
import useUser from '~/hooks/useUser';

// components
import styled from '@emotion/styled';
import ChatInput from './ChatInput';
import Message from '~/components/chat/Message';
import DynamicIsland from '~/components/dynamicIsland/DynamicIsland';
import AsyncBoundary from '~/components/base/AsyncBoundary';
import ErrorFallback from '~/components/base/ErrorFallback';

// sockets
import { MESSAGE, SOCKET_EVENT } from '~/constants';
import roomSocket, { initRoomSocket, leaveRoom } from '~/sockets/roomSocket';
import BaseLayout from '~/components/layouts/BaseLayout';

const ChatPage = () => {
  const { roomId } = useParams() as { roomId: string };
  const { data: room } = useGetRoom(roomId);

  const user = useUser();
  const isHost: boolean = room?.userId === user?.id;

  const [messages, setMessages] = useState<
    { uid: string; username: string; message: string }[]
  >([]);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [question, setQuestion] = useState<{
    uid: string;
    username: string;
    message: string;
  } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const receiveMessage = () => {
    roomSocket.socket?.on(
      SOCKET_EVENT.CHAT_MESSAGE,
      ({ uid, username, message }: MessagePayload) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { uid, username, message },
        ]);
      },
    );
  };

  const handleChooseQuestion = (
    uid: string,
    username: string,
    message: string,
  ) => {
    roomSocket.socket?.emit(SOCKET_EVENT.CHOOSE_QUESTION, {
      roomId,
      uid,
      username,
      message,
    });
  };

  const handleAnswerQuestion = () => {
    roomSocket.socket?.emit(SOCKET_EVENT.ANSWER_QUESTION, {
      roomId,
    });
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
    roomSocket.socket?.on(
      SOCKET_EVENT.LEFT_ROOM,
      ({ uid, username, message }: MessagePayload) => {
        setMessages((prev) => [...prev, { uid, username, message }]);
      },
    );
    roomSocket.socket?.on(
      SOCKET_EVENT.TYPING_STATUS,
      ({ uid, username, isTyping }: TypingStatusPayload) => {
        if (isTyping) {
          setTypingUsers((prev) => [...prev, username]);
        } else {
          setTypingUsers((prev) =>
            prev.filter((username) => username !== username),
          );
        }
      },
    );
    roomSocket.socket?.on(
      SOCKET_EVENT.QUESTION_CHOSEN,
      ({
        uid,
        username,
        message,
      }: {
        uid: string;
        username: string;
        message: string;
      }) => {
        setQuestion({ uid, username, message });
      },
    );

    roomSocket.socket?.on(SOCKET_EVENT.QUESTION_ANSWERED, () => {
      setQuestion(null);
    });

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
    <AsyncBoundary
      rejectedFallback={
        <ErrorFallback
          queryKey={useGetRoom.getKey(roomId)}
          message={MESSAGE.ERROR.LOAD_DATA}
        />
      }
    >
      <BaseLayout>
        <Container ref={scrollRef}>
          <Wrapper>
            <DynamicIsland
              question={question}
              isHost={isHost}
              {...(isHost && {
                onAnswerQuestion: handleAnswerQuestion,
              })}
            />

            <Contents>
              {messages.map((message, index) => {
                const isMyMessage: boolean = user?.id === message.uid;
                return (
                  <Message
                    key={index}
                    uid={message.uid}
                    username={message.username}
                    message={message.message}
                    isMyMessage={isMyMessage}
                    isHost={isHost}
                    {...(isHost && {
                      onChooseQuestion: () =>
                        handleChooseQuestion(
                          message.uid,
                          message.username,
                          message.message,
                        ),
                    })}
                  />
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
    </AsyncBoundary>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: scroll;
  overflow-x: hidden;
  padding: 24px 16px;
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

export default ChatPage;
