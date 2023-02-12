// react
import { useEffect } from 'react';

// stores
import useWriteStore from '~/stores/useWriteStore';

// components
import styled from '@emotion/styled';
import Editor from '~/components/write/Editor';
import Preview from '~/components/write/Preview';
import PublishScreen from '~/components/write/publish/PublishScreen';
import FullHeightScreen from '~/components/base/FullHeightScreen';

const WritePage = () => {
  const { reset } = useWriteStore();
  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return (
    <FullHeightScreen>
      <Container>
        <Editor />
        <Preview />
        <PublishScreen />
      </Container>
    </FullHeightScreen>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export default WritePage;
