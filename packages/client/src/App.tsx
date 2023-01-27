// react-router-dom
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// hooks
import { useGetMe } from './hooks/queries/user';

// pages
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import Write from './pages/Write/Write';
import Room from './pages/Room/Room';
import Setting from './pages/Setting/Setting';
import Chat from './pages/Room/Chat';
import NotFound from './pages/NotFound/NotFound';
import ErrorBoundary from './components/base/ErrorBoundary';
import ErrorFallback from './components/base/ErrorFallback';
import { MESSAGE } from './constants';

const App = () => {
  useGetMe();

  return (
    <ErrorBoundary fallback={<ErrorFallback message={MESSAGE.ERROR.UNKNOWN} />}>
      <Router>
        <Routes>
          {/* public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/write" element={<Write />} />
          <Route path="/room" element={<Room />} />
          <Route path="/setting" element={<Setting />} />

          <Route path="/room/:roomId" element={<Chat />} />

          {/* catch all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
