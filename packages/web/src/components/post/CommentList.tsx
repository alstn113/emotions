import { useRef } from 'react';

import styled from '@emotion/styled';

import CommentItem from '~/components/post/CommentItem';

import { useGetCommentList } from '~/hooks/queries/post';

import { CommentListResponse } from '~/lib/types';

import CommentInput from './CommentInput';

interface Props {
  postId: string;
}

const CommentList = ({ postId }: Props) => {
  const { data } = useGetCommentList(postId, { suspense: true });
  const comments = data as CommentListResponse; // suspense
  const commentListRef = useRef<HTMLDivElement>(null);
  return (
    <Container ref={commentListRef}>
      <CommentInput
        postId={postId}
        commentsCount={comments?.totalCount}
        commentListRef={commentListRef}
      />
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
