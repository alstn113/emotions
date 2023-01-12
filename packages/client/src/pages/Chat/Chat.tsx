import styled from '@emotion/styled';
import DynamicIsland from '~/components/DynamicIsland/DynamicIsland';

const Chat = () => {
  return (
    <Container>
      <DynamicIsland />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default Chat;
