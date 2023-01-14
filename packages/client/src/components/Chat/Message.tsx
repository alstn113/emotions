import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
}

const Message = ({ children }: Props) => {
  return (
    <AnimatePresence>
      <Container
        animate={{
          opacity: 1,
          scale: 1,
        }}
        initial={{
          opacity: 0.5,
          scale: 0.5,
        }}
      >
        {children}
      </Container>
    </AnimatePresence>
  );
};

const Container = styled(motion.div)`
  min-height: 40px;
  min-width: 120px;
  max-width: 200px;
  padding: 15px 20px;
  font-size: 0.5rem;
  // glassmorphism
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 2px 12px 0 rgba(100, 100, 100, 0.3);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

export default Message;
