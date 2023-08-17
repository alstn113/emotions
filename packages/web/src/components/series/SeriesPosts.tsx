import { Link } from 'react-router-dom';

import styled from '@emotion/styled';

import formatDate from '~/lib/formatDate';
import { SeriesPost } from '~/lib/types';

interface Props {
  seriesPosts: SeriesPost[];
  username: string;
}

const SeriesPosts = ({ seriesPosts, username }: Props) => {
  return (
    <Container>
      {seriesPosts?.map((seriesPost) => (
        <SerisePostItem
          key={seriesPost.id}
          to={`/user/${username}/post/${seriesPost.post.slug}`}
        >
          <Name>
            <b>{seriesPost.index}.</b> {seriesPost.post.title}
          </Name>
          <Description>{seriesPost.post.description}</Description>
          <CreatedAt>생성일: {formatDate(seriesPost.post.createdAt)}</CreatedAt>
        </SerisePostItem>
      ))}
    </Container>
  );
};

const Container = styled.div`
  margin-top: 2rem;
`;

const SerisePostItem = styled(Link)`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 16px;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.06);
  background-color: #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.12);
  }
`;

const Name = styled.div`
  font-size: 1.2rem;
  b {
    font-weight: 800;
  }
`;

const Description = styled.div`
  margin-top: 1rem;
  font-size: 1rem;
  color: #666;
  line-height: 1.2;
`;

const CreatedAt = styled.div`
  text-align: right;
  margin-top: 1rem;
  font-size: 0.8rem;
  color: #666;
`;
export default SeriesPosts;
