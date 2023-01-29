// react
import { useMemo, useState } from 'react';
import { Comment } from '~/types';

// hooks
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteComment } from '~/hooks/queries/comment';
import { useGetPostComments } from '~/hooks/queries/post';
import useUser from '~/hooks/useUser';

// components
import styled from '@emotion/styled';
import SubCommentList from './SubCommentList';
import ReplyComment from './ReplyComment';
import MoreVertMenu from '~/components/MoreVertMenu';

interface Props {
  comment: Comment;
  isSubcomment?: boolean;
}

const CommentItem = ({ comment, isSubcomment }: Props) => {
  const queryClient = useQueryClient();
  const user = useUser();
  const [isReplying, setIsReplying] = useState(false);

  const isDeleted = comment.isDeleted;
  const isMyComment = user?.id === comment.user.id;
  const commentDate = new Intl.DateTimeFormat('ko-kr', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(comment.createdAt));

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

  const items = useMemo(
    () => [
      {
        name: '수정',
        onClick: () => {},
      },
      {
        name: '삭제',
        onClick: handleDelete,
      },
    ],
    [handleDelete, comment.id],
  );

  // if comment is deleted
  if (isDeleted) {
    return (
      <Container>
        <DeletedText>삭제된 댓글입니다.</DeletedText>
        {!isSubcomment && comment.subcomments && (
          <SubCommentList subcomments={comment.subcomments} />
        )}
      </Container>
    );
  }

  return (
    <Container>
      <CommentHeader>
        <LeftWrapper>
          <Username>{comment.user.username}</Username>
          <Time>{commentDate}</Time>
        </LeftWrapper>
        {isMyComment && <MoreVertMenu items={items} />}
      </CommentHeader>
      <CommentBody>
        <p>{comment.text}</p>
      </CommentBody>
      <CommentFooter>
        <LikeWrapper>
          <LikeButton>좋아요</LikeButton>
          <LikeCount>0</LikeCount>
        </LikeWrapper>
        <ReplyButton onClick={handleOpenReply}>답글</ReplyButton>
      </CommentFooter>

      {/* if reply button is clicked, show ReplyComment component */}
      {isReplying && <ReplyComment parentcomment={comment} onClose={handleCloseReply} />}

      {/* if subcomments exist, show SubCommentList component */}
      {!isSubcomment && comment.subcomments && <SubCommentList subcomments={comment.subcomments} />}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const DeletedText = styled.div`
  color: #999;
`;

const CommentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CommentBody = styled.div`
  margin-top: 0.3rem;
  margin-bottom: 0.5rem;
  p {
    color: #000;
    line-height: 1.5;
    font-size: 1rem;
  }
`;
const CommentFooter = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 0.5rem;
`;

const LeftWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

const Username = styled.div`
  font-size: 1rem;
  font-weight: 900;
  line-height: 1.5;
`;

const Time = styled.div`
  font-size: 0.8rem;
  line-height: 1.5;
  margin-left: 0.5rem;
  color: #999;
`;

const LikeWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LikeButton = styled.button`
  padding: 0;
`;

const LikeCount = styled.div`
  margin-left: 0.25rem;
  padding: 0;
`;

const ReplyButton = styled.button`
  padding: 0;
`;

export default CommentItem;
