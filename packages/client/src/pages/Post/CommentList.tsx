import styled from '@emotion/styled';
import useGetComments from '~/hooks/queries/comment/useGetComments';
import CommentItem from './CommentItem';

interface Props {
  postId: string;
}

const CommentList = ({ postId }: Props) => {
  const { data: comments } = useGetComments(postId, { suspense: true });
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
