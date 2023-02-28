import { Route, Routes } from 'react-router-dom';
import UserAboutTab from './tabs/UserAboutTab';
import UserPostsTab from './tabs/UserPostsTab';
import UserSeriesTab from './tabs/UserSeriesTab';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import UserPageSkeleton from '~/components/user/skeleton/UserPageSkeleton';
import UserLayout from './UserLayout';
import TabLayout from '~/components/layouts/TabLayout';
import { mediaQuery } from '~/lib/styles';
import styled from '@emotion/styled';
import UserPageErrorFallback from '~/components/user/UserPageFallback';

const UserPage = () => {
  return (
    <TabLayout>
      <Container>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ error, resetErrorBoundary }) => (
                <UserPageErrorFallback
                  error={error}
                  resetErrorBoundary={resetErrorBoundary}
                />
              )}
            >
              <Suspense fallback={<UserPageSkeleton />}>
                <Routes>
                  <Route path="/" element={<UserLayout />}>
                    <Route index element={<UserPostsTab />} />
                    <Route path="about" element={<UserAboutTab />} />
                    <Route path="series" element={<UserSeriesTab />} />
                  </Route>
                </Routes>
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </Container>
    </TabLayout>
  );
};

const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  ${mediaQuery.tablet} {
    width: 738px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default UserPage;
