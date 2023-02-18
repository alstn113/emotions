// react
import { useParams } from 'react-router-dom';
import { MESSAGE } from '~/constants';

// components
import styled from '@emotion/styled';
import AsyncBoundary from '~/components/base/AsyncBoundary';
import ErrorFallback from '~/components/base/ErrorFallback';
import { mediaQuery } from '~/lib/styles';
import BaseLayout from '~/components/layouts/BaseLayout';
import PostContents from '~/components/post/PostContents';
import PostContentsSkeleton from '~/components/post/skeleton/PostContentsSkeleton';
import { Suspense } from 'react';
import MoreVertPending from '../components/post/MoreVertPending';

const PostPage = () => {
  const { username, slug } = useParams() as { username: string; slug: string };

  return (
    <BaseLayout
      headerRight={
        <Suspense fallback={<div></div>}>
          <MoreVertPending slug={slug} />
        </Suspense>
      }
    >
      <Container>
        <AsyncBoundary
          pendingFallback={<PostContentsSkeleton />}
          rejectedFallback={<ErrorFallback message={MESSAGE.ERROR.LOAD_DATA} />}
        >
          <PostContents slug={slug} />
        </AsyncBoundary>
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

const MoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  color: #fff;
  svg {
    width: 30px;
    height: 30px;
  }
`;

export default PostPage;
