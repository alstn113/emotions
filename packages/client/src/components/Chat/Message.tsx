import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { glassmorphism } from '~/styles';

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
  width: 100%;
  word-wrap: break-word;
  padding: 15px 20px;
  font-size: 14px;

  ${glassmorphism}
`;

export default Message;
