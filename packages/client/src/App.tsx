// react-router-dom
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// hooks
import { useGetMe } from './hooks/queries/user';

// pages
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import Write from './pages/Write/Write';
import Bookmarks from './pages/Bookmarks/Bookmarks';
import Settings from './pages/Settings/Settings';
import Chat from './pages/Room/Room';
import NotFound from './pages/NotFound/NotFound';

const App = () => {
  useGetMe();

  return (
    <Router>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/write" element={<Write />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="/room/:roomId" element={<Chat />} />

        {/* catch all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
