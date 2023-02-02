import styled from '@emotion/styled';
import BaseLayout from '~/components/layouts/BaseLayout';
import Editor from './Editor';
import Preview from './Preview';
import PublishScreen from './PublishScreen';

const Write = () => {
  return (
    <Container>
      <Editor />
      <Preview />
      <PublishScreen />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export default Write;
