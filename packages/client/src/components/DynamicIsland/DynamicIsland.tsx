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
  border-radius: 10px;
  background-color: #fff;
`;
export default DynamicIsland;
