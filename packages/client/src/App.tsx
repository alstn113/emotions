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
import SearchPage from '~/pages/SearchPage';
import SettingPage from '~/pages/SettingPage';
import PostPage, { loader as postLoader } from '~/pages/PostPage';
import WritePage from '~/pages/WritePage';
import NotFoundPage from '~/pages/NotFoundPage';
import UserPage, { loader as userLoader } from './pages/user/UserPage';
import UserPostsTab from './pages/user/tabs/UserPostsTab';
import UserAboutTab from './pages/user/tabs/UserAboutTab';
import UserSeriesTab from './pages/user/tabs/UserSeriesTab';
import SeriesPage from './pages/user/SeriesPage';
import ErrorPage from './pages/ErrorPage';

const App = () => {
  useGetMe();

  const queryClient = useQueryClient();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" errorElement={<ErrorPage />}>
        <Route index element={<HomePage />} />
        <Route path="write" element={<WritePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="setting" element={<SettingPage />} />
        <Route
          path="user/:username"
          element={<UserPage />}
          loader={userLoader(queryClient)}
        >
          <Route index element={<UserPostsTab />} />
          <Route path="about" element={<UserAboutTab />} />
          <Route path="series" element={<UserSeriesTab />} />
        </Route>
        <Route
          path="user/:username/series/:seriesName"
          element={<SeriesPage />}
        />
        <Route
          path="user/:username/post/:slug"
          element={<PostPage />}
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
