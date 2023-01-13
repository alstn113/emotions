import styled from '@emotion/styled';

interface Props {
  children: React.ReactNode;
}

const Message = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  min-height: 40px;
  min-width: 120px;
  max-width: 200px;
  padding: 20px;
  font-size: 0.5rem;
  // glassmorphism
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

export default Message;
