import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { glassmorphism } from '~/styles';

interface Props {
  isHost: boolean;
}

const DynamicIsland = ({ isHost }: Props) => {
  return (
    <AnimatePresence>
      <Container
        whileHover={{ width: '80vw', height: '40vh', borderRadius: '20px' }}
        transition={{
          type: 'tween',
        }}
      >
        {isHost ? 'You Are Host' : 'You Are Not Host'}
      </Container>
    </AnimatePresence>
  );
};

const Container = styled(motion.div)`
  position: fixed;
  top: 50px;
  left: 50%;
  transform: translate(-50%, -5%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40%;
  height: 50px;
  z-index: 100;

  ${glassmorphism}
`;
export default DynamicIsland;
