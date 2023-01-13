import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';

interface Props {}

const DynamicIsland = ({}: Props) => {
  return (
    <AnimatePresence>
      <Container
        whileHover={{ width: '80vw', height: '40vh', borderRadius: '20px' }}
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
  box-shadow: 0 2px 12px 0 rgba(100, 100, 100, 0.3);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;
export default DynamicIsland;
