import styled from '@emotion/styled';
import BaseLayout from '~/components/layouts/BaseLayout';
import { mediaQuery } from '~/styles';
import Editor from './Editor';
import Preview from './Preview';

const Write = () => {
  return (
    <BaseLayout>
      <Container>
        <Editor />
        <Preview />
      </Container>
    </BaseLayout>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export default Write;
