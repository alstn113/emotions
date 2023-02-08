// react
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/base/ErrorBoundary';
import ErrorFallback from './components/base/ErrorFallback';
import { MESSAGE } from './constants';

// hooks
import { useGetMe } from './hooks/queries/user';

// pages
import HomePage from './pages/home/HomePage';
import SearchPage from './pages/SearchPage';
import SettingPage from './pages/SettingPage';
import PostPage from './pages/post/PostPage';
import WritePage from './pages/write/WritePage';
import RoomPage from './pages/room/RoomPage';
import ChatPage from './pages/room/ChatPage';
import NotFoundPage from './pages/NotFoundPage';

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

          <Route path="/post/:postId" element={<PostPage />} />
          <Route path="/room/:roomId" element={<ChatPage />} />

          {/* catch all */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
