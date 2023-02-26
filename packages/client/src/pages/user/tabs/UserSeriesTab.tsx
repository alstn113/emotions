import styled from '@emotion/styled';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';
import PostListErrorFallback from '~/components/home/PostListErrorFallback';
import UserSeriesSkeleton from '~/components/user/skeleton/UserSeriesSkeleton';
import UserSeriesContents from '~/components/user/UserSeriesContents';
import { mediaQuery } from '~/lib/styles';

const UserSeriesTab = () => {
  const { username } = useParams() as { username: string };
  return (
    <Container>
      <SeriesContainer>
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
              <Suspense fallback={<UserSeriesSkeleton />}>
                <UserSeriesContents username={username} />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </SeriesContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 16px 16px 100px;
`;

const SeriesContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(1, 1fr);
  ${mediaQuery.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default UserSeriesTab;
