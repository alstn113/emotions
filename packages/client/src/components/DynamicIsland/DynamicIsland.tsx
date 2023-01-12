import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';

const DynamicIsland = () => {
  return (
    <AnimatePresence>
      <Container
        whileHover={{ width: '200px', height: '280px' }}
        transition={{
          type: 'tween',
        }}
      ></Container>
    </AnimatePresence>
  );
};

const Container = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0 auto;
  margin-top: 20px;

  width: 150px;
  height: 40px;
  border-radius: 10px;
  background-color: #fff;
`;
export default DynamicIsland;
