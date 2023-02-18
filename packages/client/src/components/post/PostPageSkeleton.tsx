import styled from '@emotion/styled';
import { mediaQuery } from '~/lib/styles';
import BaseLayout from '../layouts/BaseLayout';
import CommentListSkeleton from './skeleton/CommentListSkeleton';
import PostContentsSkeleton from './skeleton/PostContentsSkeleton';

const PostPageSkeleton = () => {
  return (
    <BaseLayout>
      <Container>
        <PostContentsSkeleton />
        <CommentListSkeleton />
      </Container>
    </BaseLayout>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
  gap: 1rem;
  ${mediaQuery.tablet} {
    width: 736px;
    margin: 4rem auto;
  }
`;

export default PostPageSkeleton;
