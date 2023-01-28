import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import AsyncBoundary from '~/components/base/AsyncBoundary';
import ErrorFallback from '~/components/base/ErrorFallback';
import BaseLayout from '~/components/layouts/BaseLayout';
import { MESSAGE } from '~/constants';
import useGetComments from '~/hooks/queries/comment/useGetComments';
import { useGetPost } from '~/hooks/queries/post';
import CommentList from './CommentList';
import PostContents from './PostContents';
import CommentInput from './CommentInput';
import { mediaQuery } from '~/styles';

const Post = () => {
  const { postId } = useParams() as { postId: string };

  return (
    <BaseLayout>
      <Container>
        <AsyncBoundary
          rejectedFallback={
            <ErrorFallback queryKey={useGetPost.getKey(postId)} message={MESSAGE.ERROR.LOAD_DATA} />
          }
        >
          <PostContents postId={postId} />
        </AsyncBoundary>
        <CommentInput postId={postId} />
        <AsyncBoundary
          rejectedFallback={
            <ErrorFallback
              queryKey={useGetComments.getKey(postId)}
              message={MESSAGE.ERROR.LOAD_DATA}
            />
          }
        >
          <CommentList postId={postId} />
        </AsyncBoundary>
      </Container>
    </BaseLayout>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  gap: 1rem;
  ${mediaQuery.tablet} {
    width: 736px;
    margin: 4rem auto;
  }
`;

export default Post;
