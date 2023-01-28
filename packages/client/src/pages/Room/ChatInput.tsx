import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useTyping from '~/hooks/useTyping';
import { SOCKET_EVENT } from '~/constants';
import roomSocket from '~/sockets/roomSocket';
import { zIndexes } from '~/styles';

interface Props {
  roomId: string;
}

const ChatInput = ({ roomId }: Props) => {
  const [messageInput, setMessageInput] = useState<string>('');
  const { isTyping, startTyping, stopTyping, cancelTyping } = useTyping();

  const startTypingMessage = () => {
    roomSocket.socket?.emit(SOCKET_EVENT.TYPING_STATUS, { roomId, isTyping: true });
  };

  const stopTypingMessage = () => {
    roomSocket.socket?.emit(SOCKET_EVENT.TYPING_STATUS, { roomId, isTyping: false });
  };

  const handleSubmitMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    cancelTyping();
    sendMessage({ message: messageInput });
    setMessageInput('');
  };

  const sendMessage = ({ message }: { message: string }) => {
    roomSocket.socket?.emit(SOCKET_EVENT.CHAT_MESSAGE, {
      roomId,
      message,
    });
  };

  const handleChangeMessageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);
  };

  useEffect(() => {
    if (isTyping) startTypingMessage();
    else stopTypingMessage();
  }, [isTyping]);

  return (
    <form onSubmit={handleSubmitMessage}>
      <MessageInput
        placeholder="Write Message..."
        onChange={handleChangeMessageInput}
        onKeyDown={startTyping}
        onKeyUp={stopTyping}
        value={messageInput}
      />
    </form>
  );
};

export default ChatInput;

const MessageInput = styled.input`
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${zIndexes.ChatInput};

  width: 80%;
  height: 50px;
  padding: 0 1rem;

  // glassmorphism
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 2px 12px 0 rgba(100, 100, 100, 0.3);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;
