import styled from '@emotion/styled';
import BaseLayout from '~/components/layouts/BaseLayout';
import useDisclosure from '~/hooks/useDisclosure';
import Editor from './Editor';
import Preview from './Preview';
import PublishScreen from './PublishScreen';

const Write = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <BaseLayout>
      <Container>
        <Editor openPublishScreen={onOpen} />
        <Preview />
        <PublishScreen isOpen={isOpen} onClose={onClose} />
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
