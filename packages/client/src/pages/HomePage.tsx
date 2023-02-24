// components
import styled from '@emotion/styled';
import { mediaQuery } from '~/lib/styles';
import TabLayout from '~/components/layouts/TabLayout';
import PostList from '~/components/home/PostList';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import PostListErrorFallback from '~/components/home/PostListErrorFallback';

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
              <PostList />
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
