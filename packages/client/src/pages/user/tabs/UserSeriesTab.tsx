import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import useGetUserSeries from '~/hooks/queries/series/useGetUserSeries';

const UserSeriesTab = () => {
  const { username } = useParams() as { username: string };
  const { data: seriesList } = useGetUserSeries(username);
  return (
    <div>
      UserSeriesTab {username}
      <SeriesContainer>
        {seriesList?.map((series) => (
          <SeriesItem key={series.id}>
            <div>{series.name}</div>
            <div>{series.posts_count}</div>
          </SeriesItem>
        ))}
      </SeriesContainer>
    </div>
  );
};

const SeriesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  gap: 2rem;
`;

const SeriesItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100px;
  border-radius: 10px;
  background-color: #dedede;
`;

export default UserSeriesTab;
