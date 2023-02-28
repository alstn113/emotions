// hooks
import { useGetCommentList } from '~/hooks/queries/post';

// components
import styled from '@emotion/styled';
import CommentItem from '~/components/post/CommentItem';
import CommentInput from './CommentInput';
import { CommentListResponse } from '~/lib/types';

interface Props {
  postId: string;
}

const CommentList = ({ postId }: Props) => {
  const { data } = useGetCommentList(postId, { suspense: true });
  const comments = data as CommentListResponse; // suspense

  return (
    <Container>
      <CommentInput postId={postId} commentsCount={comments?.totalCount} />
      {comments?.list.map((comment) => {
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
