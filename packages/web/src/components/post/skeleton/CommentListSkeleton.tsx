import styled from '@emotion/styled';

import { shine } from '~/lib/styles';

const CommentListSkeleton = () => {
  return (
    <Container>
      {[1, 2, 3].map((comment) => {
        return <CommentItemSkeleton key={comment} />;
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CommentItemSkeleton = styled.div`
  height: 4rem;
  width: 100%;
  border-radius: 0.8rem;
  background: rgba(0, 0, 0, 0.1);
  animation: ${shine} 1s infinite;
`;

export default CommentListSkeleton;
