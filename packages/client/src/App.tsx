// react
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorBoundary from '~/components/base/ErrorBoundary';
import ErrorFallback from '~/components/base/ErrorFallback';
import { MESSAGE } from '~/constants';

// hooks
import { useGetMe } from '~/hooks/queries/user';

// pages
import HomePage from '~/pages/HomePage';
import SearchPage from '~/pages/SearchPage';
import SettingPage from '~/pages/SettingPage';
import PostPage from '~/pages/PostPage';
import WritePage from '~/pages/WritePage';
import RoomPage from '~/pages/RoomPage';
import ChatPage from '~/pages/ChatPage';
import NotFoundPage from '~/pages/NotFoundPage';
import UserPage from './pages/user/UserPage';
import UserPostsTab from './pages/user/tabs/UserPostsTab';
import UserAboutTab from './pages/user/tabs/UserAboutTab';
import UserSeriesTab from './pages/user/tabs/UserSeriesTab';
import SeriesPage from './pages/user/SeriesPage';

const App = () => {
  useGetMe();

  return (
    <ErrorBoundary fallback={<ErrorFallback message={MESSAGE.ERROR.UNKNOWN} />}>
      <Router>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/write" element={<WritePage />} />
          <Route path="/room" element={<RoomPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/setting" element={<SettingPage />} />

          {/* user page */}
          <Route path="/:_username" element={<UserPage />}>
            <Route index element={<UserPostsTab />} />
            <Route path="about" element={<UserAboutTab />} />
            <Route path="series" element={<UserSeriesTab />} />
          </Route>
          <Route path="/_:username/series/:name" element={<SeriesPage />} />

          <Route path="/post/:slug" element={<PostPage />} />
          <Route path="/room/:roomId" element={<ChatPage />} />

          {/* catch all */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
