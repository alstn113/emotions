// react
import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
// hooks
import { useGetMe } from '~/hooks/queries/user';

// pages
import NotFoundPage from '~/pages/NotFoundPage';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import ErrorFallback from './components/base/ErrorFallback';
import Loading from './components/base/Loading';

const HomePage = lazy(() => import('~/pages/HomePage'));
const WritePage = lazy(() => import('~/pages/WritePage'));
const SearchPage = lazy(() => import('~/pages/SearchPage'));
const SettingPage = lazy(() => import('~/pages/SettingPage'));
const UserPage = lazy(() => import('~/pages/user/UserPage'));
const SeriesPage = lazy(() => import('~/pages/user/SeriesPage'));
const PostPage = lazy(() => import('~/pages/PostPage'));

const App = () => {
  useGetMe();

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ error, resetErrorBoundary }) => (
            <ErrorFallback
              error={error}
              resetErrorBoundary={resetErrorBoundary}
            />
          )}
        >
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="write" element={<WritePage />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="setting" element={<SettingPage />} />
              <Route path="user/:username/*" element={<UserPage />} />
              <Route
                path="user/:username/series/:seriesName"
                element={<SeriesPage />}
              />
              <Route path="user/:username/post/:slug" element={<PostPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default App;
