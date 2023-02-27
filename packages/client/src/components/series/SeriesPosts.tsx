import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { SeriesPost } from '~/lib/types';

interface Props {
  seriesPosts: SeriesPost[];
  username: string;
}

const SeriesPosts = ({ seriesPosts, username }: Props) => {
  return (
    <div>
      {seriesPosts?.map((seriesPost) => (
        <SerisePostItem
          key={seriesPost.id}
          to={`/user/${username}/post/${seriesPost.post.slug}`}
        >
          <div>{seriesPost.id}</div>
          <div>{seriesPost.index}</div>
          <div>{seriesPost.post.title}</div>
        </SerisePostItem>
      ))}
    </div>
  );
};

const SerisePostItem = styled(Link)`
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

export default SeriesPosts;
