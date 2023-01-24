import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { glassmorphism } from '~/styles';

interface Props {
  children: React.ReactNode;
  isMyMessage: boolean;
  isHost: boolean;
}

const Message = ({ children, isMyMessage, isHost }: Props) => {
  return (
    <MessageWrapper isMyMessage={isMyMessage}>
      <AnimatePresence>
        <Container
          animate={{
            opacity: 1,
            scale: 1,
          }}
          initial={{
            opacity: 0.5,
            scale: 0.5,
          }}
          isMyMessage={isMyMessage}
          isHost={isHost}
        >
          {children}
        </Container>
      </AnimatePresence>
    </MessageWrapper>
  );
};

const MessageWrapper = styled.div<{ isMyMessage: boolean }>`
  display: flex;
  min-height: 40px;
  min-width: 33%;
  max-width: 66%;
  align-self: ${({ isMyMessage }) => (isMyMessage ? 'flex-end' : 'flex-start')};
`;

//TODO: isMyMessage에 따라서 색상 변경
const Container = styled(motion.div)<{ isMyMessage: boolean; isHost: boolean }>`
  width: 100%;
  word-wrap: break-word;
  padding: 15px 20px;
  font-size: 14px;

  ${glassmorphism}

  transition: 0.2s linear;
  ${({ isHost }) =>
    isHost &&
    css`
      cursor: pointer;
      &:hover {
        background: rgba(255, 255, 255, 0.5);
        border: 1px solid rgba(255, 255, 255, 0.36);
      }
    `}
`;

export default Message;
