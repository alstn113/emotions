import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { Button } from '~/components/common';
import useDisclosure from '~/hooks/useDisclosure';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const PublishScreen = ({ isOpen, onClose }: Props) => {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <Container
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.3, ease: 'linear' }}
        >
          <Button shadow onClick={onClose}>
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
