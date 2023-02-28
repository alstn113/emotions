import { Route, Routes } from 'react-router-dom';
import NotFoundPage from '~/pages/NotFoundPage';
import * as lazy from './lazy';

const PageRoutes = () => {
  return (
    <Routes>
      <Route index element={<lazy.HomePage />} />
      <Route path="write" element={<lazy.WritePage />} />
      <Route path="search" element={<lazy.SearchPage />} />
      <Route path="setting" element={<lazy.SettingPage />} />
      <Route path="user/:username/*" element={<lazy.UserPage />} />
      <Route
        path="user/:username/series/:seriesName"
        element={<lazy.SeriesPage />}
      />
      <Route path="user/:username/post/:slug" element={<lazy.PostPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default PageRoutes;
