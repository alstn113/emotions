import styled from '@emotion/styled';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';
import PostListErrorFallback from '~/components/home/PostListErrorFallback';
import UserPostsContentsSkeleton from '~/components/user/skeleton/UserPostsContentsSkeleton';
import UserPostsContents from '~/components/user/UserPostsContents';
import { mediaQuery } from '~/lib/styles';

const UserPostsTab = () => {
  const { username } = useParams() as { username: string };
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ error, resetErrorBoundary }) => (
            <PostListErrorFallback
              error={error}
              resetErrorBoundary={resetErrorBoundary}
            />
          )}
        >
          <Container>
            <Suspense fallback={<UserPostsContentsSkeleton />}>
              <UserPostsContents username={username} />
            </Suspense>
          </Container>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

const Container = styled.div`
  padding: 16px;
  width: 100%;
  ${mediaQuery.tablet} {
    width: 768px;
  }
`;

export default UserPostsTab;
