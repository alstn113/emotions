// react-router-dom
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// layouts
import BaseLayout from './components/layouts/BaseLayout';

// pages
import Home from '~/pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import Chat from './pages/Chat/Chat';
import Post from './pages/Post/Post';
import Auth from './pages/Auth/Auth';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<BaseLayout />}>
          <Route index element={<Home />} />
          <Route path="chat" element={<Chat />} />
          <Route path="post" element={<Post />} />
          <Route path="auth" element={<Auth />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;