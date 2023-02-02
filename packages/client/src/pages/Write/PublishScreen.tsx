import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '~/components/common';
import useWriteStore from '~/stores/useWriteStore';

const PublishScreen = () => {
  const { isPublishScreenOpen, closePublishScreen } = useWriteStore();
  return (
    <AnimatePresence initial={false}>
      {isPublishScreenOpen && (
        <Container
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.3, ease: 'linear' }}
        >
          <Button shadow onClick={closePublishScreen}>
            닫기
          </Button>
        </Container>
      )}
    </AnimatePresence>
  );
};

const Container = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: linear-gradient(to bottom, #ffa8a8, #d9ff6f);

  //
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default PublishScreen;
