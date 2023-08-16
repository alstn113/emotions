import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router-dom';

import styled from '@emotion/styled';
import { QueryErrorResetBoundary } from '@tanstack/react-query';

import TabLayout from '~/components/layouts/TabLayout';
import SeriesPageContents from '~/components/series/SeriesPageContents';
import SeriesContentsSkeleton from '~/components/series/skeleton/SeriesContentsSkeleton';
import SeriesPageErrorFallback from '~/components/user/SeriesPageErrorFallback';

import { mediaQuery } from '~/lib/styles';

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
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  ${mediaQuery.tablet} {
    width: 768px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default SeriesPage;
