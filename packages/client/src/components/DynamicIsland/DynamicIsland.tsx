// components
import styled from '@emotion/styled';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { glassmorphism, zIndexes } from '~/lib/styles';
import { Button } from '../common';

interface Props {
  isHost: boolean;
  question: { uid: string; username: string; message: string } | null;
  onAnswerQuestion?: () => void;
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
          <QuestionWrapper>
            <div>{question.uid}</div>
            <div>{question.username}</div>
            <div>{question.message}</div>
            {isHost && (
              <Button shadow size="sm" onClick={onAnswerQuestion}>
                질문 종료
              </Button>
            )}
          </QuestionWrapper>
        )}
      </Container>
    </AnimatePresence>
  );
};

const Container = styled(motion.div)`
  position: fixed;
  top: 5.5rem;
  left: 50%;
  transform: translate(-50%, -5%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40%;
  height: 50px;
  z-index: ${zIndexes.DynamicIsland};
  overflow: hidden;
  ${glassmorphism};
`;

const QuestionWrapper = styled.div`
  width: 80vw;
  height: 100%;
  padding: 16px;
  overflow: scroll;
`;

export default DynamicIsland;
