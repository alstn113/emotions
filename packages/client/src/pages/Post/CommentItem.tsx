import styled from '@emotion/styled';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Button } from '~/components/common';
import useDeleteComment from '~/hooks/queries/comment/useDeleteComment';
import { useGetPostComments } from '~/hooks/queries/post';
import { Comment } from '~/types';
import ReplyComment from './ReplyComment';
import SubCommentList from './SubCommentList';

interface Props {
  comment: Comment;
  isSubcomment?: boolean;
}

const CommentItem = ({ comment, isSubcomment }: Props) => {
  const queryClient = useQueryClient();
  const [isReplying, setIsReplying] = useState(false);

  const { mutate } = useDeleteComment({
    onSuccess: async () => {
      await queryClient.refetchQueries(useGetPostComments.getKey(comment.postId));
    },
    onError: (e) => {
      alert(e);
    },
  });

  const handleDelete = () => {
    mutate(comment.id);
  };

  const handleOpenReply = () => {
    setIsReplying(true);
  };
  const handleCloseReply = () => {
    setIsReplying(false);
  };

  return (
    <Container>
      <ContentsWrapper>
        {comment.deletedAt ? (
          <Text>삭제된 댓글입니다.</Text>
        ) : (
          <>
            <User>{comment.user.username}</User>
            <ButtonWrapper>
              <Button shadow color="success" size="sm" onClick={handleOpenReply}>
                Reply
              </Button>
              <Button shadow color="error" size="sm" onClick={handleDelete}>
                Delete
              </Button>
            </ButtonWrapper>
          </>
        )}
      </ContentsWrapper>
      <Text>{comment.text}</Text>
      {isReplying && <ReplyComment parentcomment={comment} onClose={handleCloseReply} />}
      {!isSubcomment && comment.subcomments && <SubCommentList subcomments={comment.subcomments} />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const ContentsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.8rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const User = styled.div`
  font-size: 1rem;
  font-weight: 700;
`;

const Text = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1.2rem;
`;

export default CommentItem;
