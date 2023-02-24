import styled from '@emotion/styled';
import { Link, useParams } from 'react-router-dom';
import useGetUserSeries from '~/hooks/queries/series/useGetUserSeries';
import { mediaQuery } from '~/lib/styles';

const UserSeriesTab = () => {
  const { username } = useParams() as { username: string };
  const { data: seriesList } = useGetUserSeries(username);
  return (
    <Container>
      <SeriesContainer>
        {seriesList?.map((series) => (
          <SeriesItem key={series.id} to={series.name}>
            <div>
              {series.name} / {series.postsCount}개
            </div>
          </SeriesItem>
        ))}
      </SeriesContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 16px 16px 100px;
`;

const SeriesContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(1, 1fr);
  ${mediaQuery.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const SeriesItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 400px;
  border-radius: 10px;
  background-color: #f5f5f5;
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;
  font-size: 2rem;

  &:hover {
    background-color: #e5e5e5;
  }

  ${mediaQuery.tablet} {
    font-size: 1.5rem;
    height: 300px;
  }
`;

export default UserSeriesTab;
