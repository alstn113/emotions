import { useParams } from 'react-router-dom';
import TabLayout from '~/components/layouts/TabLayout';

const UserPage = () => {
  const { username } = useParams() as { username: string };
  return <TabLayout>{username}</TabLayout>;
};

export default UserPage;
