import styled from '@emotion/styled';

export const Container = styled.div`
  max-width: 768px;
  width: 100%;
  margin: 0 auto;
`;

export const MessageInput = styled.input`
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;

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

export const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const MessageWrapper = styled.div<{ isCurrentUser: boolean }>`
  display: flex;
  min-height: 40px;
  min-width: 33%;
  max-width: 66%;
  align-self: ${({ isCurrentUser }) => (isCurrentUser ? 'flex-end' : 'flex-start')};
`;
