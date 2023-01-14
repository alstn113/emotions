import styled from '@emotion/styled';
import Message from '~/components/Chat/Message';
import DynamicIsland from '~/components/DynamicIsland/DynamicIsland';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { SOCKET_EVENT } from '~/constants';
import roomSocket, { initRoomSocket, leaveRoom } from '~/libs/sockets/roomSocket';
import useTyping from '~/hooks/useTyping';

const Chat = () => {
  const { roomId } = useParams() as { roomId: string };
  const { isTyping, startTyping, stopTyping, cancelTyping } = useTyping();
  const [messages, setMessages] = useState<{ message: string; sid: string }[]>([]);
  const [messageInput, setMessageInput] = useState<string>('');
  const [typingUsers, setTypingUsers] = useState<string[]>([]);

  const sendMessage = ({ message }: { message: string }) => {
    roomSocket.socket?.emit(SOCKET_EVENT.CHAT_MESSAGE, {
      roomId,
      message,
    });
  };

  const receiveMessage = () => {
    roomSocket.socket?.on(SOCKET_EVENT.CHAT_MESSAGE, (data: { message: string; sid: string }) => {
      setMessages((prevMessages) => [...prevMessages, { message: data.message, sid: data.sid }]);
    });
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
      SOCKET_EVENT.TYPING_STATUS,
      (data: { isTyping: boolean; sid: string }) => {
        if (data.isTyping) {
          setTypingUsers((prevTypingUsers) => [...prevTypingUsers, data.sid]);
        } else {
          setTypingUsers((prevTypingUsers) => prevTypingUsers.filter((sid) => sid !== data.sid));
        }
      },
    );

    return () => {
      leaveRoom();
    };
  }, [roomId]);

  useEffect(() => {
    if (isTyping) startTypingMessage();
    else stopTypingMessage();
  }, [isTyping]);

  return (
    <Container>
      <DynamicIsland />
      <Contents>
        {messages.map((message, i) => {
          return (
            <MessageWrapper isCurrentUser={roomSocket.socket?.id === message.sid}>
              <Message key={i}>{message.message}</Message>
            </MessageWrapper>
          );
        })}
        {typingUsers.map((typingUser, i) => {
          return <div key={i}>{typingUser} 입력 중...</div>;
        })}
      </Contents>
      <form onSubmit={handleSubmitMessage}>
        <MessageInput
          placeholder="Write Message..."
          onChange={handleChangeMessageInput}
          onKeyDown={startTyping}
          onKeyUp={stopTyping}
          value={messageInput}
        />
      </form>
    </Container>
  );
};

const MessageInput = styled.input`
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;

  width: 80%;
  height: 60px;
  padding: 0 1rem;

  // glassmorphism
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 2px 12px 0 rgba(100, 100, 100, 0.3);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 120px 0;
  min-height: 100vh;
  width: 80%;
`;

const MessageWrapper = styled.div<{ isCurrentUser: boolean }>`
  display: flex;
  align-self: ${({ isCurrentUser }) => (isCurrentUser ? 'flex-end' : 'flex-start')};
`;

export default Chat;
