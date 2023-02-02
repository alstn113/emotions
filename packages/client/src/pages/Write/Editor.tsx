import styled from '@emotion/styled';
import { Button } from '~/components/common';

interface Props {
  openPublishScreen: () => void;
}

const Editor = ({ openPublishScreen }: Props) => {
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
  flex: 1;
  background-color: #a8ff7c;
`;

export default Editor;
