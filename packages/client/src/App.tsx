// react-router-dom
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// pages
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import Room from './pages/Room/Room';
import Chat from './pages/Room/Chat/Chat';
import useGetMe from './hooks/queries/user/useGetMe';

const App = () => {
  useGetMe();

  return (
    <Router>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/room" element={<Room />} />
        <Route path="/room/:roomId" element={<Chat />} />

        {/* catch all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
