import styled from '@emotion/styled';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';
import TabLayout from '~/components/layouts/TabLayout';
import SeriesPageContents from '~/components/series/SeriesPageContents';
import SeriesContentsSkeleton from '~/components/series/skeleton/SeriesContentsSkeleton';
import { mediaQuery } from '~/lib/styles';
import SeriesPageErrorFallback from '../components/user/SeriesPageErrorFallback';

//TODO: fallback 보완
const SeriesPage = () => {
  const { username, seriesName } = useParams() as {
    username: string;
    seriesName: string;
  };

  return (
    <TabLayout>
      <Container>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ error, resetErrorBoundary }) => (
                <SeriesPageErrorFallback
                  error={error}
                  resetErrorBoundary={resetErrorBoundary}
                />
              )}
            >
              <Suspense fallback={<SeriesContentsSkeleton />}>
                <SeriesPageContents
                  username={username}
                  seriesName={seriesName}
                />
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
  width: 100%;
  ${mediaQuery.tablet} {
    width: 768px;
    margin: 0 auto;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default SeriesPage;
