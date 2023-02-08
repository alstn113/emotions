import styled from '@emotion/styled';
import { useEffect } from 'react';
import useWriteStore from '~/stores/useWriteStore';
import Editor from './Editor';
import Preview from './Preview';
import PublishScreen from './PublishScreen';

const Write = () => {
  const { reset } = useWriteStore();
  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

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
