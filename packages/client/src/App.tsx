// react-router-dom
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// hooks
import { useGetMe } from './hooks/queries/user';

// pages
import Home from './pages/Home/Home';
import Search from './pages/Search/Search';
import Create from './pages/Create/Create';
import Bookmarks from './pages/Bookmarks/Bookmarks';
import Settings from './pages/Settings/Settings';
import Room from './pages/Room/Room';
import Chat from './pages/Room/Chat/Chat';
import NotFound from './pages/NotFound/NotFound';

const App = () => {
  useGetMe();

  return (
    <Router>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/create" element={<Create />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/settings" element={<Settings />} />

        <Route path="/room" element={<Room />} />
        <Route path="/room/:roomId" element={<Chat />} />

        {/* catch all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
