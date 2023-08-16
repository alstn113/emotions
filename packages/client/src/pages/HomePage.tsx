import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import styled from '@emotion/styled';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

import PostList from '~/components/home/PostList';
import PostListErrorFallback from '~/components/home/PostListErrorFallback';
import PostListSkeleton from '~/components/home/skeleton/PostListSkeleton';
import TabLayout from '~/components/layouts/TabLayout';

import { mediaQuery } from '~/lib/styles';

const HomePage = () => {
  return (
    <TabLayout>
      <Container>
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
              <Suspense fallback={<PostListSkeleton />}>
                <PostList />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </Container>
    </TabLayout>
  );
};

const Container = styled.div`
  padding: 16px;
  ${mediaQuery.desktop} {
    width: 1200px;
    margin: 0 auto;
  }
  width: 100%;
`;

export default HomePage;
