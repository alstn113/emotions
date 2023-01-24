import styled from '@emotion/styled';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { glassmorphism } from '~/styles';
import { Button } from '../common';

interface Props {
  isHost: boolean;
  question: { uid: string; username: string; message: string } | null;
  onAnswerQuestion: () => void;
}

const DynamicIsland = ({ isHost, question, onAnswerQuestion }: Props) => {
  const variants: Variants = {
    open: { width: '80vw', height: '40vh' },
    closed: { width: '40%', height: '50px' },
  };

  return (
    <AnimatePresence>
      <Container
        animate={question ? 'open' : 'closed'}
        variants={variants}
        transition={{
          type: 'just',
        }}
      >
        {question && (
          <>
            <div>{question.uid}</div>
            <div>{question.username}</div>
            <QuestionWrapper>
              <div>{question.message}</div>
            </QuestionWrapper>
            {isHost && (
              <Button shadow size="sm" onClick={onAnswerQuestion}>
                질문 종료
              </Button>
            )}
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
  overflow: hidden;
  ${glassmorphism};
`;

const QuestionWrapper = styled.div`
  width: 80vw;
  height: 40vw;
  padding: 16px;
  overflow: scroll;
`;

export default DynamicIsland;
