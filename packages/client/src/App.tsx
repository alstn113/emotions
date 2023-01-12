// react-router-dom
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// pages
import Home from '~/pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Home />} />

        {/* catch all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
