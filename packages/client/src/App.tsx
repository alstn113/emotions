// react
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import ErrorBoundary from '~/components/base/ErrorBoundary';
import ErrorFallback from '~/components/base/ErrorFallback';
import { MESSAGE } from '~/constants';

// hooks
import { useGetMe } from '~/hooks/queries/user';

// pages
import HomePage from '~/pages/HomePage';
import { loader as postLoader } from '~/pages/PostPage';
import NotFoundPage from '~/pages/NotFoundPage';
import { loader as userLoader } from './pages/user/UserPage';
import UserPostsTab from './pages/user/tabs/UserPostsTab';
import UserAboutTab from './pages/user/tabs/UserAboutTab';
import UserSeriesTab from './pages/user/tabs/UserSeriesTab';
import ErrorPage from './pages/ErrorPage';
import { lazy, Suspense } from 'react';

const WritePage = lazy(() => import('~/pages/WritePage'));
const SearchPage = lazy(() => import('~/pages/SearchPage'));
const SettingPage = lazy(() => import('~/pages/SettingPage'));
const UserPage = lazy(() => import('~/pages/user/UserPage'));
const SeriesPage = lazy(() => import('~/pages/user/SeriesPage'));
const PostPage = lazy(() => import('~/pages/PostPage'));

const App = () => {
  useGetMe();

  const queryClient = useQueryClient();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" errorElement={<ErrorPage />}>
        <Route index element={<HomePage />} />
        <Route
          path="write"
          element={
            <Suspense fallback={<div>loading...</div>}>
              <WritePage />
            </Suspense>
          }
        />
        <Route
          path="search"
          element={
            <Suspense fallback={<div>loading...</div>}>
              <SearchPage />
            </Suspense>
          }
        />
        <Route
          path="setting"
          element={
            <Suspense fallback={<div>loading...</div>}>
              <SettingPage />
            </Suspense>
          }
        />
        <Route
          path="user/:username"
          element={
            <Suspense fallback={<div>loading...</div>}>
              <UserPage />
            </Suspense>
          }
          loader={userLoader(queryClient)}
        >
          <Route index element={<UserPostsTab />} />
          <Route path="about" element={<UserAboutTab />} />
          <Route path="series" element={<UserSeriesTab />} />
        </Route>
        <Route
          path="user/:username/series/:seriesName"
          element={
            <Suspense fallback={<div>loading...</div>}>
              <SeriesPage />
            </Suspense>
          }
        />
        <Route
          path="user/:username/post/:slug"
          element={
            <Suspense fallback={<div>loading...</div>}>
              <PostPage />
            </Suspense>
          }
          loader={postLoader(queryClient)}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>,
    ),
  );

  return (
    <ErrorBoundary fallback={<ErrorFallback message={MESSAGE.ERROR.UNKNOWN} />}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default App;
