import styled from '@emotion/styled';

interface Props {
  children: React.ReactNode;
}

const Message = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  background-color: #fff;
  min-height: 40px;
  min-width: 120px;
  max-width: 200px;
  border-radius: 10px;
  padding: 20px;
  font-size: 0.5rem;
`;

export default Message;
