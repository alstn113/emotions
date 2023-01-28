import styled from '@emotion/styled';
import { Comment } from '~/types';

interface Props {
  comment: Comment;
}

const CommentItem = ({ comment }: Props) => {
  return (
    <Container>
      <User>{comment.user.username}</User>
      <Text>{comment.text}</Text>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const User = styled.div`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const Text = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
`;

export default CommentItem;
