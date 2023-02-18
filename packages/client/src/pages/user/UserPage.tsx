import { Route, Routes } from 'react-router-dom';
import UserAboutTab from './tabs/UserAboutTab';
import UserPostsTab from './tabs/UserPostsTab';
import UserSeriesTab from './tabs/UserSeriesTab';
import UserLayout from './UserLayout';

const UserPage = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<UserPostsTab />} />
        <Route path="about" element={<UserAboutTab />} />
        <Route path="series" element={<UserSeriesTab />} />
      </Route>
    </Routes>
  );
};
export default UserPage;
