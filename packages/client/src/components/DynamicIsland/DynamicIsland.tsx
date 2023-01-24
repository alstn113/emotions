import styled from '@emotion/styled';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { glassmorphism } from '~/styles';

interface Props {
  isHost: boolean;
  question: { uid: string; username: string; message: string } | null;
  onAnswerQuestion: () => void;
}

const DynamicIsland = ({ isHost, question, onAnswerQuestion }: Props) => {
  const variants: Variants = {
    open: { width: '80vw', height: '40vh', borderRadius: '20px' },
    closed: { width: '40%', height: '50px', borderRadius: '10px' },
  };

  return (
    <AnimatePresence>
      <Container
        animate={question ? 'open' : 'closed'}
        variants={variants}
        transition={{
          type: 'tween',
        }}
      >
        <div>{isHost ? 'You Are Host' : 'You Are Not Host'}</div>
        {question && (
          <>
            <div>{question.uid}</div>
            <div>{question.username}</div>
            <div>{question.message}</div>

            <div onClick={onAnswerQuestion}>질문 종료</div>
          </>
        )}
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40%;
  height: 50px;
  z-index: 100;

  ${glassmorphism}
`;
export default DynamicIsland;
