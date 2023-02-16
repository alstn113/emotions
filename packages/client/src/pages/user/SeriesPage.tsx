import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import TabLayout from '~/components/layouts/TabLayout';
import useGetUserSeriesByName from '~/hooks/queries/series/useGetUserSeriesByName';
import { mediaQuery } from '~/lib/styles';

const SeriesPage = () => {
  const { username, seriesName } = useParams() as {
    username: string;
    seriesName: string;
  };

  const { data: series } = useGetUserSeriesByName(username, seriesName);
  return (
    <TabLayout>
      <Container>
        <div>{series?.name}</div>
        <div>{series?.postsCount}</div>
        {series?.seriesPosts?.map((seriesPost) => (
          <SerisePostItem key={seriesPost.id}>
            <div>{seriesPost.id}</div>
            <div>{seriesPost.index}</div>
            <div>{seriesPost.post.title}</div>
          </SerisePostItem>
        ))}
      </Container>
    </TabLayout>
  );
};

const Container = styled.div`
  padding: 16px;
  ${mediaQuery.desktop} {
    width: 1200px;
    margin: 0 auto;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SerisePostItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.06);
  background-color: #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.12);
  }
`;

export default SeriesPage;
