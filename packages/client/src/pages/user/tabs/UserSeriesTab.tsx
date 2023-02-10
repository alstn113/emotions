import { useParams } from 'react-router-dom';
import useGetUserSeries from '~/hooks/queries/series/useGetUserSeries';

const UserSeriesTab = () => {
  const { username } = useParams() as { username: string };
  const { data } = useGetUserSeries(username);
  return <div>UserSeriesTab {username}</div>;
};

export default UserSeriesTab;
