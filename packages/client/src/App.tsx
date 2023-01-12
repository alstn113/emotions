// react-router-dom
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// layouts
import BaseLayout from './components/layouts/BaseLayout';

// pages
import Home from '~/pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import Room from './pages/Room/Room';
import Chat from './pages/Chat/Chat';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/room" element={<BaseLayout />}>
          <Route path=":roomId" element={<Room />} />
        </Route>
        <Route path="/" element={<BaseLayout />}>
          <Route path="chat" element={<Chat />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
