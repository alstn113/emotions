// react-router-dom
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// pages
import Home from '~/pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import Room from './pages/Room/Room';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/room/:roomId" element={<Room />} />
        {/* catch all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
