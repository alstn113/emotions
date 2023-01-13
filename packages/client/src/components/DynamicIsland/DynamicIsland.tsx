import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  test: boolean;
}

const DynamicIsland = ({ test }: Props) => {
  return (
    <AnimatePresence>
      <Container
        animate={{ width: test ? '80vw' : '40%', height: test ? '40vh' : '7%' }}
        // whileHover={{ width: '80vw', height: '40vh', borderRadius: '20px' }}
        transition={{
          type: 'tween',
        }}
      ></Container>
    </AnimatePresence>
  );
};

const Container = styled(motion.div)`
  position: fixed;
  top: 30px;
  left: 50%;
  transform: translate(-50%, -5%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40%;
  height: 7%;
  z-index: 100;
  // glassmorphism
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;
export default DynamicIsland;
