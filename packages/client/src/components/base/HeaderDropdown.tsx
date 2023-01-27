import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { useRef } from 'react';
import useDisclosure from '~/hooks/useDisclosure';
import { Button } from '../common';

const HeaderDropdown = () => {
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Button ref={triggerRef}>Dropdown</Button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <Container
            initial={{ scale: 0.9, opacity: 0.2 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.33, duration: 0.3 }}
            ref={contentRef}
          ></Container>
        )}
      </AnimatePresence>
    </>
  );
};

const Container = styled(motion.div)``;

export default HeaderDropdown;
