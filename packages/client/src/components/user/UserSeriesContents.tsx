import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { mediaQuery } from '~/lib/styles';
import useGetUserSeries from '~/hooks/queries/series/useGetUserSeries';

interface Props {
  username: string;
}

const UserSeriesContents = ({ username }: Props) => {
  const { data: seriesList } = useGetUserSeries(username, {
    suspense: true,
  });

  return (
    <>
      {seriesList?.map((series) => (
        <SeriesItem key={series.id} to={series.name}>
          <div>
            {series.name} / {series.postsCount}개
          </div>
        </SeriesItem>
      ))}
    </>
  );
};

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

export default UserSeriesContents;
