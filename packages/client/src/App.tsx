// react
import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import ErrorBoundary from '~/components/base/ErrorBoundary';
import ErrorFallback from '~/components/base/ErrorFallback';
import { MESSAGE } from '~/constants';

// hooks
import { useGetMe } from '~/hooks/queries/user';

// pages
import NotFoundPage from '~/pages/NotFoundPage';
import BaseLayout from './components/layouts/BaseLayout';

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
    <ErrorBoundary fallback={<ErrorFallback message={MESSAGE.ERROR.UNKNOWN} />}>
      <Suspense fallback={<BaseLayout />}>
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
  );
};

export default App;
