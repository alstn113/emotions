import styled from '@emotion/styled';
import { Button } from '~/components/common';
import useWriteStore from '~/stores/useWriteStore';

const Editor = () => {
  const { openPublishScreen } = useWriteStore();
  return (
    <Container>
      <Button shadow onClick={openPublishScreen}>
        Publish
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #a8ff7c;
`;

export default Editor;
