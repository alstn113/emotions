import { useParams } from 'react-router-dom';

const SeriesPage = () => {
  const { name } = useParams() as { name: string };
  return <div>{name}</div>;
};

export default SeriesPage;
