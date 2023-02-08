// hooks
import { useGetPostComments } from '~/hooks/queries/post';

// components
import styled from '@emotion/styled';
import CommentItem from '~/components/post/CommentItem';

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
  gap: 1.5rem;
`;

export default CommentList;
