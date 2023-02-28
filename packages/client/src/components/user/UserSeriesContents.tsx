import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { mediaQuery } from '~/lib/styles';
import { useGetUserSeries } from '~/hooks/queries/series';
import { Comment as SeriesVector } from '../vectors';
import formatDate from '~/lib/formatDate';

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
          <SeriesVector />
          <SeriesInfo>
            <span className="seriesName">시리즈 제목: {series.name}</span>
            <span>시리즈 생성일: {formatDate(series.createdAt)}</span>
            <span>마지막 업데이트: {formatDate(series.updatedAt)}</span>
            <span>{series.postsCount}개의 포스트</span>
          </SeriesInfo>
        </SeriesItem>
      ))}
    </>
  );
};

const SeriesItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 400px;
  border-radius: 10px;
  background-color: #f5f5f5;
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;
  padding: 1rem 2rem;
  font-size: 2rem;
  gap: 1rem;

  svg {
    width: 8rem;
    height: 8rem;
    color: #ccc;
  }

  &:hover {
    background-color: #e5e5e5;
  }

  ${mediaQuery.tablet} {
    font-size: 1.5rem;
    height: 300px;
  }
`;

const SeriesInfo = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  font-size: 1rem;
  color: #666;
  gap: 0.5rem;

  .seriesName {
    font-weight: 800;
  }
`;

export default UserSeriesContents;
