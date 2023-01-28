import styled from '@emotion/styled';
import { useGetPostComments } from '~/hooks/queries/post';
import CommentItem from './CommentItem';

interface Props {
  postId: string;
}

const CommentList = ({ postId }: Props) => {
  const { data: comments } = useGetPostComments(postId, { suspense: true });
  return (
    <Container>
      {comments?.map((comment) => {
        return <CommentItem key={comment.id} comment={comment} />;
      })}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default CommentList;
